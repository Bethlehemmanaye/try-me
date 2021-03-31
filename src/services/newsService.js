import http from "./httpService";
const apiEndpoint = "/news";
function newsUrl(id) {
  return `${apiEndpoint}/${id}`;
}

//always returns promise object, we have to await when we call it
export function getNews() {
  return http.get(apiEndpoint);
}

export function deleteNews(newsId) {
  return http.delete(newsUrl(newsId));
}
export function getNewss(newsId) {
  return http.get(newsUrl(newsId));
}
export function saveNews(news) {
  //for update

  if (news._id) {
    const body = { ...news };
    delete body._id;
    let formData = new FormData();
    for (var key in body) {
      formData.append(key, body[key]);
    }
    return http.put(newsUrl(news._id), formData);
  }
  //for new
  let formData = new FormData();
  const body = { ...news };
  delete body.images;
  for (const key in news.images) {
    formData.append("images", news.images[key]);
  }
  for (var key in body) {
    formData.append(key, body[key]);
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return http.post(apiEndpoint, formData, config);
}
