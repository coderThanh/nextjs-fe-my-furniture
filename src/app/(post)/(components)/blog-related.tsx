import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import { formatDate } from '@/helpers'

type Props = {
  data: any[]
}

export default function SingleBlogRelated({ data }: Props) {
  return (
    <>
      {data.length > 0 ? (
        <div className="single-relate single-section">
          <div className="single-relate-title single-section-title">
            Bài viết liên quan
          </div>
          <div className="single-relate-content single-section-content">
            {data.map((item, index) => {
              return (
                <CardBlog
                  key={index}
                  thumbnail={item?.thumbnail?.url}
                  imgRatio={56.2}
                  imgRadius={7}
                  type={CardBlogType.vertical}
                  isShowDate={true}
                  date={formatDate(item.createdAt ?? Date.now())}
                  title={item?.title}
                  slug={item?.slug}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
