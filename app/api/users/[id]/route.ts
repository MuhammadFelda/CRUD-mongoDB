import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "mongodb"; // Sesuaikan path jika perlu

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        if (!params.id) {
            return NextResponse.json(
                { error: "ID harus diisi" },
                { status: 400 }
            );
        }

        const client = await clientPromise; // Menghubungkan ke MongoDB
        const db = client.db(); // Gunakan database yang sesuai
        const collection = db.collection("users"); // Sesuaikan nama koleksi jika perlu

        const result = await collection.deleteOne({
            _id: new MongoClient.ObjectId(params.id), // Mengubah string ID ke ObjectId
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User berhasil dihapus" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { error: "Gagal menghapus user" },
            { status: 500 }
        );
    }
}
