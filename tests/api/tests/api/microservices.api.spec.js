import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'https://jsonplaceholder.typicode.com',

  extraHTTPHeaders: {
    Accept: 'application/json',
    'X-Correlation-ID': 'QA-COURSE-LESSON-4',
  },
});

test.describe('Query parameter testing', () => {
  test('GET returns posts belonging only to user 1', async ({
    request,
  }) => {
    const response = await request.get('/posts', {
      params: {
        userId: 1,
      },
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    console.log('Number of posts:', responseBody.length);

    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);

    for (const post of responseBody) {
      expect(post.userId).toBe(1);
      expect(post.id).toEqual(expect.any(Number));
      expect(post.title).toEqual(expect.any(String));
      expect(post.body).toEqual(expect.any(String));
    }
  });

  test('GET with nonexistent user returns an empty array', async ({
    request,
  }) => {
    const response = await request.get('/posts', {
      params: {
        userId: 999999,
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('Nonexistent user response:', responseBody);

    expect(responseBody).toEqual([]);
    expect(responseBody.length).toBe(0);
  });
});

test.describe('API chaining between resources', () => {
  test('user has posts and first post has comments', async ({
    request,
  }) => {
    // Шаг 1: получаем пользователя
    const userResponse = await request.get('/users/1');

    expect(userResponse.status()).toBe(200);

    const user = await userResponse.json();

    expect(user.id).toBe(1);
    expect(user.name).toEqual(expect.any(String));
    expect(user.email).toEqual(expect.any(String));

    console.log('User:', user.name);

    // Сохраняем ID из первого ответа
    const userId = user.id;

    // Шаг 2: используем userId в следующем запросе
    const postsResponse = await request.get(
      `/users/${userId}/posts`,
    );

    expect(postsResponse.status()).toBe(200);

    const posts = await postsResponse.json();

    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post.userId).toBe(userId);
    }

    // Сохраняем postId из второго ответа
    const firstPostId = posts[0].id;

    console.log('First post ID:', firstPostId);

    // Шаг 3: используем postId в третьем запросе
    const commentsResponse = await request.get(
      `/posts/${firstPostId}/comments`,
    );

    expect(commentsResponse.status()).toBe(200);

    const comments = await commentsResponse.json();

    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBeGreaterThan(0);

    for (const comment of comments) {
      expect(comment.postId).toBe(firstPostId);
      expect(comment.email).toEqual(expect.any(String));
      expect(comment.body).toEqual(expect.any(String));
    }

    console.log('Number of comments:', comments.length);
  });
});

test.describe('Basic Authentication testing', () => {
  const basicAuthUrl =
    'https://postman-echo.com/basic-auth';

  test('request with valid credentials returns 200', async ({
    request,
  }) => {
    const username = 'postman';
    const password = 'password';

    const encodedCredentials = Buffer.from(
      `${username}:${password}`,
    ).toString('base64');

    const response = await request.get(basicAuthUrl, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    console.log('Valid authentication status:', response.status());

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });

  test('request without credentials returns 401', async ({
    request,
  }) => {
    const response = await request.get(basicAuthUrl);

    console.log('Missing authentication status:', response.status());

    expect(response.status()).toBe(401);
    expect(response.ok()).toBeFalsy();
  });
});

test.describe('Negative API testing', () => {
  test('GET nonexistent post returns 404', async ({
    request,
  }) => {
    const response = await request.get('/posts/999999');

    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();

    const responseBody = await response.json();

    console.log('404 response:', responseBody);

    expect(responseBody).toEqual({});
  });
});