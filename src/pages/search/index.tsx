import { useRouter } from "next/router";

export default function Page(){
    const router = useRouter();

    const {p} = router.query;

    return <h1>search {p}</h1>;
}