import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

//시험삼아 만들어봤습니다....
export const ApiNokResponse = () => {
  return applyDecorators(ApiResponse({ status: 500, description: '서버에러' }));
};
