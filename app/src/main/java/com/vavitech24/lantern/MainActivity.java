package com.vavitech24.lantern;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import java.io.ByteArrayInputStream;
import java.util.Collections;

public class MainActivity extends Activity {
    private WebView game;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        game = new WebView(this);
        game.setBackgroundColor(0xffdde4d7);
        game.getSettings().setJavaScriptEnabled(true);
        game.getSettings().setDomStorageEnabled(true);
        game.getSettings().setAllowFileAccess(false);
        game.getSettings().setAllowContentAccess(false);
        game.getSettings().setMediaPlaybackRequiresUserGesture(true);
        game.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) {
                if ("https://appassets.androidplatform.net/index.html".equals(url))
                    view.evaluateJavascript("window.vaviAndroid=true;", null);
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                if (request.isForMainFrame() && "vavi".equals(request.getUrl().getScheme())) {
                    if ("landscape".equals(request.getUrl().getHost()))
                        setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
                    else if ("auto".equals(request.getUrl().getHost()))
                        setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_FULL_USER);
                    return true;
                }
                return !"appassets.androidplatform.net".equals(request.getUrl().getHost());
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                String path = request.getUrl().getPath();
                if (!"appassets.androidplatform.net".equals(request.getUrl().getHost()) || path == null || !path.matches("/[a-zA-Z0-9_.-]+")) return empty();
                try {
                    String mime = path.endsWith(".js") ? "application/javascript" : path.endsWith(".css") ? "text/css" : path.endsWith(".svg") ? "image/svg+xml" : path.endsWith(".png") ? "image/png" : path.endsWith(".jpg") ? "image/jpeg" : "text/html";
                    WebResourceResponse r = new WebResourceResponse(mime, "UTF-8", getAssets().open(path.substring(1)));
                    r.setResponseHeaders(Collections.singletonMap("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'none'; object-src 'none'"));
                    return r;
                } catch (Exception e) { return empty(); }
            }
            private WebResourceResponse empty() { return new WebResourceResponse("text/plain", "UTF-8", new ByteArrayInputStream(new byte[0])); }
        });
        setContentView(game);
        game.loadUrl("https://appassets.androidplatform.net/index.html");
    }
    @Override protected void onPause() { super.onPause(); game.evaluateJavascript("if(typeof pause==='function')pause();", null); game.onPause(); game.pauseTimers(); }
    @Override protected void onResume() { super.onResume(); if(game != null) { game.onResume(); game.resumeTimers(); } }
    @Override public void onBackPressed() {
        if ("https://appassets.androidplatform.net/android-privacy.html".equals(game.getUrl())) {
            game.loadUrl("https://appassets.androidplatform.net/index.html");
            return;
        }
        game.evaluateJavascript("if(typeof state!=='undefined' && state==='playing')pause();else if(typeof home==='function')home();", null);
    }
    @Override protected void onDestroy() { if(game != null)game.destroy(); super.onDestroy(); }
}
