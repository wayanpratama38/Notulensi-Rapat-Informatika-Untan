/*
  Warnings:

  - The primary key for the `MeetingParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `participantId` on the `MeetingParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `MeetingParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOSEN', 'ADMIN');

-- DropForeignKey
ALTER TABLE "MeetingParticipant" DROP CONSTRAINT "MeetingParticipant_participantId_fkey";

-- AlterTable
ALTER TABLE "MeetingParticipant" DROP CONSTRAINT "MeetingParticipant_pkey",
DROP COLUMN "participantId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "MeetingParticipant_pkey" PRIMARY KEY ("meetingId", "userId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DOSEN',
ADD COLUMN     "tandaTangan" TEXT;

-- DropTable
DROP TABLE "Participant";

-- AddForeignKey
ALTER TABLE "MeetingParticipant" ADD CONSTRAINT "MeetingParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
