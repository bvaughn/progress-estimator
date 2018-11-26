# progress-estimator

Logs a progress bar and estimation for how long a Promise will take to complete. This library tracks previous durations in order to provide more accurate estimates over time.

![Demo](https://user-images.githubusercontent.com/29597/48986949-474e2400-f0cf-11e8-86d7-d201f8ad8eca.gif)

## Usage example

```js
const createLogger = require('progress-estimator');

// All configuration keys are optional, but it's recommended to specify a storage location.
// Learn more about configuration options below.
const logger = createLogger({
  storagePath: join(__dirname, '.progress-estimator'),
});

async function run() {
  await logger(promiseOne, "This is a promise");
  await logger(
    promiseTwo,
    "This is another promise. I think it will take about 1 second",
    {
      estimate: 1000
    }
  );
}
```

## Configuration

The following values are configurable via the named `configure` export. Note that all configuration is stored at the package level.

| name | type | Description |
| --- | --- | --- |
| `logFunction` | Function | Custom logging function. Defaults to [`log-update`](https://npmjs.com/package/log-update). Must define `.done()` and `.clear()` methods. |
| `spinner` | object | Which spinner from the [`cli-spinners`](https://npmjs.com/package/cli-spinners) package to use. Defaults to `dots`. |
| `storagePath` | string | Where to record durations between runs. Defaults to [`os.tmpdir()`](https://nodejs.org/api/os.html). |
| `theme` | object | Custom [`chalk`](https://npmjs.com/package/chalk) theme. Look to the [default theme](https://github.com/bvaughn/progress-estimator/blob/master/src/theme.js) for a list of required keys. |
