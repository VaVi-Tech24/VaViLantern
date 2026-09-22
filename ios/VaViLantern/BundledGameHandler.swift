import Foundation
import WebKit

/// Stable local origin for WebKit storage. This is not an internet server.
final class BundledGameHandler: NSObject, WKURLSchemeHandler {
    static let scheme = "vavi-game"
    static let host = "localhost"
    private let files: [String: String] = [
        "index.html": "text/html", "style.css": "text/css", "campaign.css": "text/css",
        "engine.js": "text/javascript", "sound.js": "text/javascript",
        "characters.js": "text/javascript", "game.js": "text/javascript",
        "offline.js": "text/javascript", "cosmic-lantern.png": "image/png",
        "vavi-tech-logo.png": "image/png", "jonah-run.png": "image/png", "logo.svg": "image/svg+xml"
    ]

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url,
              url.scheme == Self.scheme, url.host == Self.host,
              urlSchemeTask.request.httpMethod == "GET",
              let mime = files[String(url.path.dropFirst())],
              let folder = Bundle.main.url(forResource: "Game", withExtension: nil),
              let data = try? Data(contentsOf: folder.appendingPathComponent(String(url.path.dropFirst()))) else {
            urlSchemeTask.didFailWithError(URLError(.fileDoesNotExist))
            return
        }
        let headers = [
            "Content-Type": mime + (mime.hasPrefix("text/") ? "; charset=utf-8" : ""),
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'",
            "X-Content-Type-Options": "nosniff"
        ]
        guard let response = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: headers) else {
            urlSchemeTask.didFailWithError(URLError(.badServerResponse))
            return
        }
        // Synchronous bundled reads avoid callbacks after WebKit cancels a task.
        urlSchemeTask.didReceive(response)
        urlSchemeTask.didReceive(data)
        urlSchemeTask.didFinish()
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}
}
