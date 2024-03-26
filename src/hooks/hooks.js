
const { BeforeAll, AfterAll, Before, After, Status } = require('@cucumber/cucumber');
const { fixture } = require('./fixture');
const { rimrafSync } = require('rimraf');
const { invokeBrowser } = require('../helper/browsers/browserManager');
const { getEnv } = require('../helper/env/env');

const fs = require("fs-extra")

let browser
let context

BeforeAll(async function() {
  //Clean up test-results
  rimrafSync("test-results/screenshots");
  rimrafSync("test-results/trace");
  rimrafSync("test-results/videos");

  getEnv();
  browser = await invokeBrowser();
})

Before(async function({ pickle }) {
  const scenarioName = pickle.name + pickle.id
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos"
    }
  })
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true
  })
  const page = await context.newPage()
  fixture.page = page
})

After(async function({ pickle, result }) {
  let videoPath
  let img

  if (result?.status == Status.FAILED) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png"
    })
    videoPath = await fixture.page.video().path()
  }
  const path = `./test-results/trace/${pickle.id}.zip`
  await context.tracing.stop({ path: path })
  await fixture.page.close()
  await context.close()

  if (result?.status == Status.FAILED) {
    this.attach(img, "image/png")
    this.attach(fs.readFileSync(videoPath), "video/webm")
  }
})

AfterAll(async function() {
  await browser.close()
})
