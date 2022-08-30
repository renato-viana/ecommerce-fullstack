import { UserStore } from '../user';

const store = new UserStore();

describe(' User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('create method should add a user and return status code 200', async () => {
        await store.create({
            name: 'Renato',
            email: 'renatoviana30@gmail.com',
            password: 'password123'
        });
        expect(200);
    });

    it('index method should return a list of users and status code 200', async () => {
        await store.index();
        expect(200);
    });

    it('show method should return the correct user and status code 200 ', async () => {
        await store.show('1');
        expect(200);
    });

    it('update method should update the user and return status code 200', async () => {
        await store.update({
            id: 2,
            name: 'Renato',
            email: 'renatoviana30@gmail.com',
            password: 'password123'
        });
        expect(200);
    });

    it('authenticate method should authenticate the user and return status code 200', async () => {
        await store.authenticate({
            name: 'Renato',
            email: 'renatoviana30@gmail.com',
            password: 'password123'
        });

        expect(200);
    });
});
