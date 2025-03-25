export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">timetable</span>
            <span className="word">classes</span>
            <span className="word">lectures</span>
            <span className="word">subjects</span>
            <span className="word">breaks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
