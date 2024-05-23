import { ModulePathnames } from "@/enums";
import { GetServerSideProps } from "next";

export default function HomePage() {
  return <>Hello</>;
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  return {
    redirect: {
      permanent: false,
      destination: ModulePathnames.SMART_INDS,
    }
  };
}
