
import Tabbouleh, {JSONSchema, JSONString} from 'tabbouleh'

@JSONSchema<AppSettings>({})
export class AppSettings {
    @JSONString
    test?: string
}

@JSONSchema<MailAccount>({
    // required: ['id'],
})
export class MailAccount {
    id = 0
    @JSONString
    displayName?: string
    @JSONString
    address?: string
    @JSONString
    host?: string
    @JSONString
    port?: string
    @JSONString
    user?: string
    @JSONString
    password?: string
}

export const mailAccountSchema = Tabbouleh.generateJSONSchema(MailAccount)
export const appSettingsSchema = Tabbouleh.generateJSONSchema(AppSettings)