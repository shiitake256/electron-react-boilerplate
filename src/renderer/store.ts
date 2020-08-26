import { Subject, interval } from 'rxjs'
import { map } from 'rxjs/operators'

export const dateTime = interval(1000).pipe(map(() => new Date()))
export const exampleMessage = new Subject<string>()
export const pingMessage = new Subject<string>()
