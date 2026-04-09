import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    //fallback: false,  //없는 페이지  404 
    //fallback : "blocking" // 없으면 신규로 만들어주는 SSR방식
    fallback : true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id))

  if(!book){
    return {
      notFound : true
    }
  }


  return {

    props : {
      book
    },
  }
}




export default function Page({
  book,
} : InferGetStaticPropsType<typeof getStaticProps>) {

    const router = useRouter()
    if(router.isFallback){
      return "로딩중입니다.";
    }

    if (!book) return "문제가 발생했습니다. 다시시도하세요";


  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={coverImgUrl} />
    </Head>
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
    </>
  );
}
