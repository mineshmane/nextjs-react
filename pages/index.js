import Layout from '../components/mylayout';
import fetch from 'isomorphic-unfetch';

import Link from 'next/link';
import Header from '../components/header';

var ls = require('local-storage');

const PostLink = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

 function Blog() {

  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="hello-nextjs" />
        <PostLink id="learn-nextjs" />
        <PostLink id="deploy-nextjs" />
      </ul>
    </Layout>
  );
}


const Index = props => (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows}
        {/* {props.shows.map((show,i) => (
          <li key={i}>
            <Link href="/p/[id]" as={`/p/${show.label}`}>
              <a>{show.label}</a>
            </Link>
          </li>
        ))} */}
      </ul>
    </Layout>
  );
  
  Index.getInitialProps = async () => {
    ls.set('token','qdvuGlaAt60esAHePlGafJMPeYKTAx22rPRBbjsAJrOVgHRMKzYrdqpq2JbrmiFz')
    
    console.log(ls.get('token')|| '');
    
      
    const res = await fetch('http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList',{
      headers: {
        'Content-Type': 'application/json',
        Authorization: ls.get('token')
      }
    });
   console.log(res);
   
    
    const data1 = await res.json();
    // const data = [];

   
    // console.log(res);
    // let data=[]
    // data=res
    console.log(data1.data.data);
    const data=data1.data.data
    console.log(`Show data fetched. Count: ${data}`);
  
    return {
        
      shows: data.map((ele,i) => <div key={i}>{ele.title}</div>)
    };
  };
  
  export default Index;