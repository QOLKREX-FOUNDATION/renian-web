import Image from "next/image";
import classes from "./news.module.scss";
import Zoom from "react-reveal/Zoom";
import { MainContainer } from "../../";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { useMemo } from "react";

export const News = ({ news }) => {
	return (
		<section className={classes.news} id="news">
			<MainContainer>
				<div className={classes.news__container}>
					<Zoom cascade>
						<div className={classes.news__text}>
							<h1>Últimas noticias</h1>
							<p>
								¿Qué está pasando actualmente? Entérate de los últimos
								acontecimientos en relación al mundo animal
							</p>
						</div>
					</Zoom>
					{news && <Carousel news={news} />}
				</div>
			</MainContainer>
		</section>
	);
};

const Carousel = ({ news }) => {
	const items = useMemo(() => news?.items, [news]);

	return (
		<>
			<div className={`${classes.carousel}`}>
				{items?.length > 0 && (
					<Swiper
						slidesPerView="auto"
						loop={true}
						centeredSlides={true}
						autoplay={{
							delay: 10000,
							disableOnInteraction: false,
						}}
						navigation={true}
						pagination={{
							clickable: true,
						}}
						breakpoints={{
							767: {
								slidesPerView: 3,
							},
						}}
						modules={[Autoplay, Navigation, Pagination]}
					>
						{items?.map((article, index) => (
							<SwiperSlide key={index}>
								<div className={classes.news__slide}>
									<a
										href={article.link}
										target="_blank"
										rel="noreferrer noopener"
									>
										<div className={classes.news__card}>
											<div className={classes.news__cardImage}>
												<Image
													src={article.thumbnail}
													layout="responsive"
													width={90}
													height={40}
													alt="image"
												/>
											</div>

											<div className={classes.news__cardContent}>
												<h6>{article.author}</h6>
												<h3>{article.title}</h3>
												<p>{article.pubDate}</p>
											</div>
										</div>
									</a>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>

			{/* <main className={`${classes.carousel} ${classes.carousel__mobile}`}>
        <Swiper
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {mediumArticles.map((article, index) => {
            return (
              <div key={index}>
                <div>
                  <SwiperSlide>
                    <div className={classes.news__slide}>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <div className={classes.news__card}>
                          <div
                            className={classes.news__cardImage}
                          >
                            <Image
                              src={article.image}
                              layout="responsive"
                              width={90}
                              height={40}
                              href="image"
                            />
                          </div>

                          <div className={classes.news__cardContent}>
                            <h6>{article.author}</h6>
                            <h3>{article.title}</h3>
                            <p>{article.content}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                </div>
              </div>
            );
          })}
        </Swiper>
      </main> */}
		</>
	);
};
