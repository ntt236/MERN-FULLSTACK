import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import accImg from "../../assets/banner-3.webp";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="container grid grid-cols-1 gap-8 py-8 mx-auto">
        <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-background">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
