import { useEffect, useState } from "react";
import api from "../../api/api";

const NewsPage = () => {

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  // ================= FETCH ALL NEWS =================
  const fetchNews = async () => {

    const res = await api.get("/news");

    // show only LIVE news (optional but recommended)
    const liveNews = res.data.filter(n => n.isLive === true);

    setNews(liveNews);
  };

  // ================= INCREASE VIEW ON CLICK =================
  const openNews = async (id) => {

  // get stored viewed news
  const viewedNews = JSON.parse(localStorage.getItem("viewedNews")) || [];

  // if already viewed → don't count again
  if (viewedNews.includes(id)) {
    console.log("Already viewed");
    return;
  }

  try {

    // call API to increment view
    await api.get(`/news/${id}`);

    // store this id in localStorage
    viewedNews.push(id);
    localStorage.setItem("viewedNews", JSON.stringify(viewedNews));

    // reload updated counts
    fetchNews();

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="container py-4">

      <h4 className="mb-4">Latest News</h4>

      <div className="row">

        {news.map(n => (

          <div key={n._id} className="col-md-4 mb-3">

            <div
              className="card shadow"
              style={{ cursor: "pointer" }}
              onClick={() => openNews(n._id)}
            >

              <div className="card-body">

                <h6>{n.title}</h6>

                <p>{n.snippet}</p>

                <span className="badge bg-primary">
                  👁 {n.views}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default NewsPage;
