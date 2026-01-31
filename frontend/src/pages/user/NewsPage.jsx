import { useEffect, useState } from "react";
import api from "../../api/api";

const NewsPage = () => {

  const [news, setNews] = useState([]);
  const [activeNews, setActiveNews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  // ================= FETCH ALL NEWS =================
  const fetchNews = async () => {

    const res = await api.get("/news");

    const liveNews = res.data.filter(n => n.isLive === true);

    setNews(liveNews);
  };

  // ================= OPEN NEWS =================
  const openNews = async (item) => {

    const viewedNews =
      JSON.parse(localStorage.getItem("viewedNews")) || [];

    if (!viewedNews.includes(item._id)) {

      try {

        await api.get(`/news/${item._id}`);

        viewedNews.push(item._id);
        localStorage.setItem("viewedNews", JSON.stringify(viewedNews));

        fetchNews();

      } catch (error) {
        console.log(error);
      }
    }

    document.body.style.overflow = "hidden";
    setActiveNews(item);
  };

  // ================= CLOSE NEWS =================
  const closeNews = () => {
    document.body.style.overflow = "auto";
    setActiveNews(null);
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">

      

        <span className="badge bg-danger rounded-pill px-3 py-2">
          LIVE
        </span>

      </div>

      {/* NEWS GRID */}
      <div className="row g-4">

        {news.map(n => (

          <div key={n._id} className="col-lg-4 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              role="button"
              onClick={() => openNews(n)}
            >

              <div className="card-body d-flex flex-column">

                <h6 className="fw-bold mb-2">
                  {n.title}
                </h6>

                {/* PREVIEW */}
                <p
                  className="text-muted small mb-3 overflow-hidden"
                  style={{ height: "60px" }}
                >
                  {n.snippet}
                </p>

                <div className="mt-auto d-flex justify-content-between align-items-center">

                  {/* <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                    👁 {n.views}
                  </span> */}

                  <span className="small text-muted">
                    Read More →
                  </span>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* FULL NEWS VIEW */}
      {activeNews && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >

          <div className="col-lg-7 col-md-9 col-11">

            <div className="card shadow-lg">

              <div className="card-body">

                <h4 className="fw-bold mb-3">
                  {activeNews.title}
                </h4>

                <div
                  className="text-muted overflow-auto mb-3"
                  style={{ maxHeight: "60vh" }}
                >
                  {activeNews.snippet}
                </div>

                <div className="d-flex justify-content-between align-items-center">

                  <span>👁 {activeNews.views}</span>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={closeNews}
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default NewsPage;
