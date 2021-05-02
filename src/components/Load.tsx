import ContentLoader from 'react-content-loader'

export default function Load(props){
    return(
      <ContentLoader
        speed={2}
        viewBox="0 0 340 84"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
         <rect x="0" y="30%" rx="10" ry="10" width="80%" height="25" />
      </ContentLoader>
    )    
} 