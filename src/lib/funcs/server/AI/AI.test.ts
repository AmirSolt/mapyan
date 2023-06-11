import {describe, it, expect} from "vitest"
import * as AI from "./index"



const sampleProducts:Product[] = [
    {
      brand: 'AIMTOM',
      image_url: 'https://m.media-amazon.com/images/I/61hA39RRvHL.jpg',
      key: 'B0791Y1WSQ',
      price: 124.9,
      rating: 4.4,
      title: 'AIMTOM 42000mAh 155Wh Power Station, Emergency Backup Power Supply with Flashlights (Solar Panel Optional), for Camping, Home, CPAP, Travel, Outdoor (110V/ 100W AC Outlet, 3X 12V DC, 3X USB Output)',
      url: 'https://www.amazon.com/AIMTOM-Portable-Generator-Emergency-Flashlights/dp/B0791Y1WSQ?tag=mapyan-20',
      productInfo: {"key":"B0791Y1WSQ", "description":'▲ ADVANCED BATTERY MANAGEMENT SYSTEM: The built-in BMS protects you against overcurrent, overvoltage, and over-temperature, ensuring the safety of you and your devices and prolonging battery life. It also features a built-in cooling fan to avoid overheating when charging. ▲ SO QUIET, EFFICIENT POWER: Rest assured that your portable battery will not disturb you or your loved ones, since it utilizes a built-in power inverter and runs quietly. It can be recharged via supported solar panels (Not included), car port, or AC wall outlets. Its built in MPPT controller automatically optimizes charging process and maximizes power extraction from solar panels under all conditions. ▲ TAKE YOUR POWER SUPPLY WITH YOU ANYWHERE: Even though our power station features a HUGE 42000mAh lithium battery, it weighs ONLY 3.48lbs. Plus, the comfortable and ergonomic handle will make carrying your outdoor emergency power sources a breeze. Just slip it in your car trunk and embark on your next adventure. ▲ ONE POWER GENERATOR FOR ALL YOUR DEVICES: Power up your laptop, stereo or any other home appliances via the 110V/100W AC outlet. Use the 3 x 5V USB outputs to charge your mobile phone, iPhone, iPad, GPS or action cameras while the 3 x 12V DC outputs are perfect for car refrigerators, fans and more. ▲ GIGANTIC 42000mAh BATTERY WILL COVER ALL YOUR NEEDS: The AIMTOM SPS-155 Portable Generator, which has an IMMENSE 42000mAh 155Wh power capacity, is ideal for powering appliances at a campsite, a tailgate party, home improvement projects or can even double as a flashlight for emergencies.'}
    },
    {
      brand: 'Jackery',
      image_url: 'https://m.media-amazon.com/images/I/71z6d03iT8S._AC_SL1500_.jpg',
      key: 'B07D29QNMJ',
      price: 239,
      rating: 4.7,
      title: 'Jackery Portable Power Station Explorer 240, 240Wh Backup Lithium Battery, 110V/200W Pure Sine Wave AC Outlet, Solar Generator (Solar Panel Not Included) for Outdoors Camping Travel Hunting Emergency',
      url: 'https://www.amazon.com/Jackery-Portable-Power-Station-Generator/dp/B07D29QNMJ',
      productInfo: {"key":"B07D29QNMJ","description":`WHAT YOU GET: 1* Jackery Explorer 240 portable power station, 1*AC adapter, 1* car charger cable, 1* user guide. GREEN POWER SUPPLY: The power station can be recharged by the Jackery SolarSaga 60 solar panel or SolarSaga 100 solar panel. Its built-in MPPT controller enables the solar panel to operate at its max power point for the power station to be recharged at its highest efficiency. TWO alternative ways to recharge: through the wall outlet or the car outlet. VERSATILE POWER SOURCE: 1* Pure Sine Wave AC outlet (110V 200W 400W Peak), 2* USB-A ports (5V, 2.4A), and 1* 12V DC car port to charge your road trip essentials such as smartphones, laptops, cameras, fans, lights and so on. Pass-through charging is supported. EASY TO CARRY: This entry-level portable power station is equipped with a 240Wh lithium-ion battery pack, weighing only at 6.6 pounds. The solid handle makes it easy to carry around for outdoor adventures such as Tent Camping, Road Trip, Backyard Camping, etc. BUY WITH CONFIDENCE: The Jackery Explorer 240 portable power station has been featured as the "Best Portable Power Station for use in the outdoors" by Digital Trends. A classic choice for your pick.`}
    } 
] 


// describe("AI product parser", () => {

//     it("sampleProducts", async ()=>{
//         const result = AI.productParser(sampleProducts)
//         expect(result.length).eq(sampleProducts.length)
//         expect(result[0].description.length).above(5)
//     })

// });


describe("AI create features", () => {

    it("comparisonKey B0791Y1WSQ-B07D29QNMJ", async ()=>{
        const result = await chatgpt.createOptionFeatures("B0791Y1WSQ-B07D29QNMJ")
        expect(result?.comparison?.body?.length).above(5)
    })

});
