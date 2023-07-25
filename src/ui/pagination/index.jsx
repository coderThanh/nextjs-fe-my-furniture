import Pagination from '@/components-root/pagination'

export default function UIPaination() {
  return (
    <>
      <section className="archive-pagination mt-70 mb-80">
        <div className="container">
          <Pagination count={8} current={4} showLength={5} />
        </div>
      </section>
    </>
  )
}
