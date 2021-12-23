import axios from 'axios';

export class AppointmentsService {
    async fetchAll(status) {
        return (await axios.get('/appointment/populated/' + status)).data;
    }

    async fetchOne(id) {
        return (await axios.get('/appointment/' + id)).data;
    }

    async updateStatus(status, id) {
        return (await axios.patch('/appointment/' + id, status)).data;
    }

    async update(appointment) {
        return (await axios.patch('/appointment', appointment)).data;
    }

    async getDashboard() {
        return (await axios.get('/appointment/dashboard/')).data;
    }
}
