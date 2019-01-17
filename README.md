# heroku-startstop
Start, stop and resize heroku dynos. Useful in conjunction with [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler).

## Usage
Set the number of dynos to 0 and enable maintenance mode for the specified apps.
```console
npm run stop <app-name> [<app-name> [<app-name> ...]]
```

Set the number of dynos to 1 and enable maintenance mode for the specified apps.
```console
npm run start <app-name> [<app-name> [<app-name> ...]]
```

Set the dyno size for the specified apps.
```console
npm run size <free|hobby|standard-1x|standard-2x|professional-l|professional-m> <app-name> [<app-name> [<app-name> ...]]
```

## Examples
```console
npm run stop app-name-1 app-name-2 app-name-3
npm run start app-name-1 app-name-2 app-name-3
npm run size standard-2x app-name-1 app-name-2 app-name-3
```