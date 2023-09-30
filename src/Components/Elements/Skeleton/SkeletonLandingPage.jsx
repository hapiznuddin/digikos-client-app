import { Skeleton, SkeletonText } from "@chakra-ui/react";

export const SkeletonLandingPage = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <Skeleton style={{ width: "100%", borderRadius: "20px" }}>
  <div className="w-full h-72 rounded-2xl bg-primary-100"/>
      </Skeleton>
  <div className="card-body">
    <Skeleton style={{ width: "150px", height: "24px" }}>
    <h2 className="card-title">Shoes lalalalal</h2>
    </Skeleton>
    <SkeletonText noOfLines={3} spacing="4" mt={4} mb={4}/>
    <div className="card-actions justify-end flex flex-col">
      <Skeleton w={"100%"}>
      <button className="btn btn-xs w-full">Buy Now</button>
      </Skeleton>
      <Skeleton w={"100%"}>
      <button className="btn btn-primary w-full">Buy Now</button>
      </Skeleton>
    </div>
  </div>
</div>
  )
}
