import { NotFoundException } from '@nestjs/common';

export const exceptionIfNotFound = (entity: any, message: string) => {
  if (!entity) {
    throw new NotFoundException(message);
  }
};
