import TopBar from "@/app/components/TopBar/TopBar";
import Workspace from "@/app/components/Workspace/Workspace";
import { problems } from "@/app/utils/Examples/page";

const ProblemPages = ({params}) => {

  console.log(params);
  const {pid} = params;
  // console.log("pid == ",pid);

  const problem = problems[pid];
  problem.handlerFunction = problem.handlerFunction.toString();
  // console.log(problem);

    return (
        <>
        <TopBar problemPage={true}/>
        <Workspace problem={problem}/>
        </>

    );
};

// Return a list of `params` to populate the [pid] dynamic segment
export async function generateStaticParams() {
    const paths = Object.keys(problems);
  //   if(paths)
  //     console.log(paths);
  //  else 
  //     console.log("paths Not Found");

    return paths.map((path) => ({
      params: {pid : path},
    }));
  }

export default ProblemPages;