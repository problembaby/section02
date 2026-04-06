// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  //컴포넌트보다 먼저 실행해서 데이터 불러옴
  //console.log('서버실행');
  const data = 'hello';
  return { props: {
    data,
  } };
};

export default function Home({data} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  useEffect(() => {
    console.log('클라이언트 실행');
  }, []);


  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>

      <section>
        <h3>추가 내용</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
