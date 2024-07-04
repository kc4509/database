import {
  MockInstance, // utility for "mocking" a function, so we can control what it returns
  afterEach, // a block that runs after every test case
  beforeEach, // a block that runs before every test case
  describe, // a block that organizes groups of tests
  expect, // a function for testing/asserting a value is what we think it is
  it, // the test block
  vi, // utility for spying and mocking (and restoring mocks and spies)
} from 'vitest';
import { performSearch } from "./main";

describe("main", () => {
  let fetchSpy: MockInstance;
  let testData = { test: "data" };

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, "fetch");
  });

  afterEach(() => {
    // clean up that puts fetch back to normal
    // (in case other tests elsewhere need to use its original form)
    vi.restoreAllMocks();
  });
  it('should make a fetch request', () => {
    // provide a simulated return value for fetch()
    // in place of response: { json: () => Promise<data> }
    fetchSpy.mockResolvedValue({
      json: () => new Promise((resolve) => resolve(testData))
    })

    performSearch({name: 'amber'})
    
    // look at the first argument to the latest call of fetch() (which is the Request)
    const request = fetchSpy.mock.lastCall![0] as Request
    // and check to see that it has the values we expect
    expect(request.url).toEqual('https://openlibrary.org/search.json?title=title&author=author&fields=fields')
    expect(request.method).toEqual('GET')
  });
});

