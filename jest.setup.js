const { json } = require('stream/consumers')

require('@testing-library/jest-dom')

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve([]),
    })
);