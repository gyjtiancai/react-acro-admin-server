/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { HttpMiddleware } from './http.middleware';

describe('HttpMiddleware', () => {
  it('should be defined', () => {
    expect(new HttpMiddleware()).toBeDefined();
  });
});