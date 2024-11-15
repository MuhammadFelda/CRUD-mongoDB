import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;  // Pastikan client sudah terhubung
        const db = client.db();  // Gunakan database default dari URI (tugas)
        const collection = db.collection("users");  // Pastikan nama collection yang benar

        // Ambil data pengguna dari MongoDB
        const users = await collection.find({}).toArray();

        return NextResponse.json(users);  // Kirimkan data pengguna dalam format JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
