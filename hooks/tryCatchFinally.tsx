import { AxiosResponse } from "axios";

interface tryCatchFinallyProps {
  promise: Promise<AxiosResponse>;
  retries?: number;
  delay?: number;
  finallyCallback?: () => void;
}

/*
    TODO:
    호출에러 발생 시 재시도 기능
    try catch finally 구조 사용, 비즈니스 로직은 호출부에서 처리합니다
    api는 타입에 따라서 변경해서 사용합니다
*/

export default async function tryCatchFinally({
  promise,
  retries = 3,
  delay = 1000,
  finallyCallback,
}: tryCatchFinallyProps): Promise<any> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      attempt++;
      const result = await promise;
      return { result: result, error: null };
    } catch (error) {
      if (attempt > retries) {
        return { result: null, error };
      }
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    } finally {
      finallyCallback && finallyCallback();
    }
  }
}
