import axios from 'axios';

export class TimeSlotService {
    async fetchAll() {
        return (await axios.get('/time-slot')).data;
    }

    async fetchOne(id) {
        return (await axios.get('/time-slot/' + id)).data;
    }

    async create(timeslot) {
        return (await axios.post('/time-slot', timeslot)).data;
    }

    async delete(timeslot) {
        return (await axios.delete('/time-slot/' + timeslot._id)).data;
    }

    async update(timeslot) {
        return (await axios.patch('/time-slot', timeslot)).data;
    }
}
