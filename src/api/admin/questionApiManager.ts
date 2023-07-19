import apiManager from "../apiServiceManager.service";

export const fetchQuestion = async (params: object) => {
  const response = await apiManager.get(
    "questions",
    {
      params: params,
    }
  );
  return response.data;
};

export const createQuestion = async (question: object) => {
  const response = await apiManager.post(
    "questions",
    question
  );
  return response.data;
};
export const deleteQuestion = async (id: number) => {
  const response = await apiManager.delete(
    `questions/${id}`
  );
  return response.data;
};
export const editQuestion = async (question: object, id: number) => {
  const response = await apiManager.put(
    `questions/${id}`,
    question
  );
  return response.data;
};