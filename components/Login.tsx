import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as yup from "yup";
import { Formik } from "formik";
import { tmdbApi } from "@/hooks/api";
import { setSessionId, setUsername } from "@/redux/idSlice";
import { setAccountId } from "@/redux/idSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import LottieView from "lottie-react-native";

/*
    TODO:
    yup: 유효성 검사 라이브러리
    - 바닐라 자바스크립트 빚니스 로직 쓸 필요 없습니다.
    formik: 폼 관리 라이브러리
    - useCForm 보다 10배는 더 좋은듯, 굉장히 편리합니다. 
    - 오브젝트 메서드 체이닝 방식으로 기술합니다.
    - 자료형, minmax, match, required 등 유효성 검사 쉽게 할 수 있습니다.

    yup: 유효성 검사 라이브럴리, 바닐라 자바스크립트 빚니스 로직 쓸 필요가 없어서 너무 좋다.
    formik: 폼 관리 라이브러리, useCForm 보다 10배는 더 좋다. 쓰기 굉장히 편함
*/

const Login = ({
  setModalVisible,
}: {
  setModalVisible: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loginValidationSchema = yup.object().shape({
    username: yup.string().required("아이디를 입력해주세요"),
    password: yup.string().required("비밀번호를 입력해주세요"),
  });

  const submit = async (values: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      const tokenResponse = await tmdbApi.get(
        `${process.env.BASE_URL}/authentication/token/new`,
        {
          params: { api_key: process.env.API_KEY },
        }
      );
      const requestToken = tokenResponse.data.request_token;

      await tmdbApi.post(
        `${process.env.BASE_URL}/authentication/token/validate_with_login`,
        {
          username: values.username,
          password: values.password,
          request_token: requestToken,
        },
        { params: { api_key: process.env.API_KEY } }
      );

      const sessionResponse = await tmdbApi.post(
        `${process.env.BASE_URL}/authentication/session/new`,
        { request_token: requestToken },
        { params: { api_key: process.env.API_KEY } }
      );

      const sessionId = sessionResponse.data.session_id;

      const myDetail = await tmdbApi.get(`${process.env.BASE_URL}/account`, {
        params: {
          api_key: process.env.API_KEY,
          session_id: sessionId,
        },
      });

      const accountId = myDetail.data.id;
      const username = myDetail.data.username;

      await Promise.all([
        AsyncStorage.setItem("sessionId", sessionId.toString()),
        AsyncStorage.setItem("accountId", accountId.toString()),
        AsyncStorage.setItem("username", username),
      ]);

      dispatch(setSessionId(sessionId));
      dispatch(setAccountId(accountId));
      dispatch(setUsername(username));

      Alert.alert("로그인 성공", "환영합니다!", [
        {
          text: "확인",
          onPress: () => setModalVisible(false),
        },
      ]);
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        (error.response?.data.success as boolean) === false
      ) {
        Alert.alert(
          "로그인 실패",
          "아이디 혹은 비밀번호를 잘못 입력하셨습니다.",
          [{ text: "확인" }]
        );
      } else {
        Alert.alert(
          "로그인 실패",
          "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
          [{ text: "확인" }]
        );
      }
      setIsLoading(false);
    }
  };

  return (
    <View className="w-[50vw]">
      {isLoading && (
        <>
          <View className="absolute z-10 h-full items-center">
            <LottieView
              source={require("@/assets/lottie/Loading.json")}
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
              }}
            />
          </View>
        </>
      )}

      <Text style={styles.title}>Login</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={submit}
        validateOnMount={false} // * isValid = false
        validateOnChange={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="person"
                  size={25}
                  color="black"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="아이디"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              {errors.username && touched.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="lock"
                  size={25}
                  color="black"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="비밀번호"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              style={[styles.button, !isValid && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});
