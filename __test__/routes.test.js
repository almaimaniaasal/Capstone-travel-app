const request = require('supertest')
const app = require('../src/server/server')
    // describe('Post Endpoints', () => {
    //     it('should create a new post', async() => {
    //         const res = await request(app)
    //             .post('/api/posts')
    //             .send({
    //                 userId: 1,
    //                 title: 'test is cool',
    //             })
    //         expect(res.statusCode).toEqual(201)
    //         expect(res.body).toHaveProperty('post')
    //     })
    // })


test('adds 1 + 2 to equal 3', () => {
    expect(app(1, 2)).toBe(3);
});