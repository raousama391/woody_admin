import axios from 'axios';

export class SettingsService {
    async update(user) {
        return (await axios.patch('/person', user)).data;
    }
    async changePassword(data) {
        return (await axios.patch('/person/change-password', data)).data;
    }
}
