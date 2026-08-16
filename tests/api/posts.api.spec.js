import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'https://jsonplaceholder.typicode.com',

  extraHTTPHeaders: {
    Accept: 'application/json',
  },
});

test.describe('Posts API testing', () => {
  test('GET existing post returns 200 and correct data', async ({
    request,
  }) => {
    const response = await request.get('/posts/1');

    console.log('GET status:', response.status());

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');

    const responseBody = await response.json();

    console.log('GET response:', responseBody);

    expect(responseBody).toMatchObject({
      userId: 1,
      id: 1,
    });

    expect(responseBody.title).toEqual(expect.any(String));
    expect(responseBody.body).toEqual(expect.any(String));
    expect(responseBody.title.length).toBeGreaterThan(0);
  });

  test('GET nonexistent post returns 404', async ({
    request,
  }) => {
    const response = await request.get('/posts/999999');

    console.log('Negative GET status:', response.status());

    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();
  });

  test('POST creates a new post', async ({ request }) => {
    const requestBody = {
      title: 'Smart Home automation',
      body: 'Learning API testing with Playwright',
      userId: 1,
    };

    const response = await request.post('/posts', {
      data: requestBody,
    });

    console.log('POST status:', response.status());

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    console.log('POST response:', responseBody);

    expect(responseBody).toMatchObject(requestBody);
    expect(responseBody.id).toEqual(expect.any(Number));
  });
});