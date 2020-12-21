import React
//, {useEffect}
from 'react'
// import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Link from 'next/link'

import UserInfo from '../components/UserInfo'
import { fetchUserAction } from 'store/user/actions'
import wrapper from 'store';

interface IProps {
  test: string
}

const IndexPage: NextPage<IProps> = (props) => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchUserAction.request({
  //     isServer: false
  //   }))
  // }, []);

  return (
    <div>
      <h1>Index Page {props.test}</h1>
      <UserInfo />
      <br />
      <nav>
        <Link href="/other">
          <a>Navigate to "/other"</a>
        </Link>
      </nav>
    </div>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('2. Page.getStaticProps uses the store to dispatch things');
    console.log(111)
    context.store.dispatch(fetchUserAction.request({
      isServer: true
    }));
    console.log(222)
});

// export const getStaticProps = wrapper.getStaticProps(
//   async (context) => {

//   }
// });

export default IndexPage;
