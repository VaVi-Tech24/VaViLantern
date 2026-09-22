import UIKit
import WebKit

// WKUserContentController retains its handlers, so forward through a weak reference.
private final class OrientationHandler: NSObject, WKScriptMessageHandler {
    weak var owner: GameViewController?
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame,
              message.frameInfo.securityOrigin.protocol == BundledGameHandler.scheme,
              message.frameInfo.securityOrigin.host == BundledGameHandler.host,
              let value = message.body as? String, ["landscape", "auto"].contains(value) else { return }
        owner?.changeOrientation(landscape: value == "landscape")
    }
}

final class GameViewController: UIViewController, WKNavigationDelegate {
    private var webView: WKWebView!
    private var orientationMask: UIInterfaceOrientationMask = .allButUpsideDown
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { orientationMask }
    override var prefersStatusBarHidden: Bool { true }
    override var prefersHomeIndicatorAutoHidden: Bool { true }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 0.08, green: 0.17, blue: 0.16, alpha: 1)
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default()
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        config.setURLSchemeHandler(BundledGameHandler(), forURLScheme: BundledGameHandler.scheme)
        let orientation = OrientationHandler()
        orientation.owner = self
        config.userContentController.add(orientation, name: "orientation")
        webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = view.backgroundColor
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            webView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            webView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor)
        ])
        webView.load(URLRequest(url: URL(string: "vavi-game://localhost/index.html")!))
    }

    func pauseGame() {
        webView?.evaluateJavaScript("if(typeof pause==='function')pause();if(window.LanternSound)window.LanternSound.suspend();", completionHandler: nil)
    }

    func changeOrientation(landscape: Bool) {
        guard let scene = view.window?.windowScene else { return }
        let previous = orientationMask
        orientationMask = landscape ? .landscape : .allButUpsideDown
        setNeedsUpdateOfSupportedInterfaceOrientations()
        webView.evaluateJavaScript("window.vaviOrientationChanged(\(landscape));", completionHandler: nil)
        scene.requestGeometryUpdate(.iOS(interfaceOrientations: orientationMask)) { [weak self] _ in
            DispatchQueue.main.async {
                guard let self = self else { return }
                self.orientationMask = previous
                self.setNeedsUpdateOfSupportedInterfaceOrientations()
                self.webView.evaluateJavaScript("window.vaviOrientationChanged(\(previous == .landscape));toast('Turn your device sideways to play in landscape.');", completionHandler: nil)
            }
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let url = navigationAction.request.url
        let allowed = url?.scheme == BundledGameHandler.scheme && url?.host == BundledGameHandler.host
            && url?.path == "/index.html" && navigationAction.targetFrame?.isMainFrame == true
        decisionHandler(allowed ? .allow : .cancel)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        if view.window?.windowScene?.activationState != .foregroundActive { pauseGame() }
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        // Reload into the menu; only completed progress is persisted by the game.
        webView.reload()
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        guard (error as NSError).code != NSURLErrorCancelled else { return }
        let alert = UIAlertController(title: "The game could not open", message: "Please try again.", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Retry", style: .default) { [weak self] _ in self?.webView.reload() })
        present(alert, animated: true)
    }
}
