import EmptyImg from "@/assets/cloud.png";
const Empty = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <img src={EmptyImg} alt="empty" className="w-20 h-20" />
      <p className="mt-2">해당 장소의 정보가 제공되지 않습니다.</p>
    </div>
  );
};

export default Empty;
