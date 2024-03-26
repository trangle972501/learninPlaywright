const { chromium, firefox, LaunchOptions, webkit } = require( "@playwright/test")

const options = {
    headless: false
  }

function invokeBrowser() {
    const browsers = process.env.npm_config_browser || "chrome";
    const arrayBrowser = browsers.split("\n\n");
    for (const browserType of arrayBrowser) {
        switch(browserType) {
            case "chrome":
                return chromium.launch(options);
            case "firefox":
                return firefox.launch(options);
            case "webkit":
                return webkit.launch(options);
            default:
                throw new Error("Invalid browser name!")
        }
    }
    
}

exports.invokeBrowser = invokeBrowser;