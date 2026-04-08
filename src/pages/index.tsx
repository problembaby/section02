// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchBookRandom from "@/lib/fetch-books-random";

export const getServerSideProps = async() => {

  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchBookRandom()
  ])
  return { 
    props: {
      allBooks, 
      randomBooks}
   };
};

export default function Home({
  allBooks,
  randomBooks
} : InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>

    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
