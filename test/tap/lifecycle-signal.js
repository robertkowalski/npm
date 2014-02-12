var test = require("tap").test
var npm = require("../../")
var node = process.execPath
var spawn = require("child_process").spawn
var path = require("path")
var pkg = path.resolve(__dirname, "lifecycle-signal")

process.chdir(pkg)
test("lifecycle signal abort", function (t) {
  t.plan(1)
  // windows does not use lifecycle signals, abort
  if (process.platform === "win32") return t.end()

  npm.load({}, function (err) {
    npm.install(".", function (er) {})
  })

  process.on("SIGSEGV", function (code, signal) {
    t.pass("got signal")
    t.end()
  })
})
