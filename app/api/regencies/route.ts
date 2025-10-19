import { NextResponse } from "next/server";
import { getRegencies, getProvinces } from "idn-area-data";

export async function GET() {
  try {
    const provinces = await getProvinces();
    const regencies = await getRegencies();

    const data = regencies.map((e) => {
      const province = provinces.find((p) => p.code === e.province_code);

      return `${e.name} - ${province?.name}`;
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch regencies", error);
    return NextResponse.json({ message: "Failed to fetch regencies." }, { status: 500 });
  }
}
