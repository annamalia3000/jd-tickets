import classes from './baner.module.css';

type BannerProps = { //как лучше передвать баннер
    title? : string;
    img: string;
    height: string;
    children?: React.ReactNode;
}

export const Banner = ({title, img, height, children} : BannerProps) => {
  return (
    <div className={classes['banner']}
    style={{ backgroundImage: `url(${img})`, height: height }}>
       {title && <div className={classes['banner__title']}>{title}</div>}
        <div className={classes['banner__content']}>
        {children}
        </div>

    </div>
  )
}

