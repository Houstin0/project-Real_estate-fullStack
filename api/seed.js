import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.message.deleteMany({});
  await prisma.conversation.deleteMany({});
  await prisma.savedPost.deleteMany({});
  await prisma.postDetail.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // Function to hash passwords
  const hashPassword = async (password) => {
    const saltRounds = 10; // You can adjust the number of salt rounds
    return await bcrypt.hash(password, saltRounds);
  };

  // Dummy users
  const users = [
    {
      email: "houstin00@gmail.com",
      username: "Houstin",
      role: "ADMIN",
      password: await hashPassword("password"),
      avatar:
        "http://localhost:8800/uploads/houstin.jpg",
    },
    {
      email: "money@mail.com",
      username: "money",
      password: await hashPassword("password"),
      avatar:
        "http://localhost:8800/uploads/money.jpg",
    },
    {
      email: "terry@mail.com",
      username: "Terry",
      password: await hashPassword("password"),
      avatar:
        "http://localhost:8800/uploads/terry.jpg",
    },
    {
      email: "admin@example.com",
      username: "admin",
      role: "ADMIN",
      password: await hashPassword("password"),
      avatar:
        "http://localhost:8800/uploads/admin.jpg",
    },
  ];

  // Insert users into the database
  await prisma.user.createMany({ data: users });

  // Retrieve the created users and separate admins and regular users
  const createdUsers = await prisma.user.findMany();
  const regularUsers = createdUsers.filter((user) => user.role !== "ADMIN");

  const admins = createdUsers.filter((user) => user.role === "ADMIN");

  // Dummy posts with locations around Nairobi
  const posts = [
    {
      title: 'Modern Apartment in Westlands',
      price: 50000,
      images: ['http://localhost:8800/uploads/house-inside1.jpg'],
      address: 'Westlands, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2667',
      longitude: '36.8056',
      type: 'rent',
      property: 'apartment',
      userId: admins[0].id,
    },
    {
      title: 'Luxury Villa in Karen',
      price: 150000,
      images: ['http://localhost:8800/uploads/house1.jpg','http://localhost:8800/uploads/house1-1.jpg'],
      address: 'Karen, Nairobi',
      city: 'Nairobi',
      bedroom: 5,
      bathroom: 4,
      latitude: '-1.3146',
      longitude: '36.6809',
      type: 'buy',
      property: 'house',
      userId: admins[1].id,
    },
    {
      title: 'Affordable Condo in Ruaka',
      price: 35000,
      images: ['http://localhost:8800/uploads/house-inside2.jpg'],
      address: 'Ruaka, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 1,
      latitude: '-1.2092',
      longitude: '36.7920',
      type: 'rent',
      property: 'condo',
      userId: admins[0].id,
    },
    {
      title: 'Spacious Land in Ruiru',
      price: 100000,
      images: ['http://localhost:8800/uploads/house5.jpg'],
      address: 'Ruiru, Nairobi',
      city: 'Nairobi',
      latitude: '-1.1551',
      longitude: '37.0074',
      type: 'buy',
      property: 'land',
      userId: admins[1].id,
    },
    {
      title: '2 Bedroom Apartment in Kilimani',
      price: 60000,
      images: ['http://localhost:8800/uploads/house-inside3.jpg'],
      address: 'Kilimani, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 2,
      latitude: '-1.2921',
      longitude: '36.7801',
      type: 'rent',
      property: 'apartment',
      userId: admins[0].id,
    },
    {
      title: 'Stylish Condo in Kileleshwa',
      price: 55000,
      images: ['http://localhost:8800/uploads/house-inside4.jpg','http://localhost:8800/uploads/house-inside16.jpg'],
      address: 'Kileleshwa, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2735',
      longitude: '36.7695',
      type: 'rent',
      property: 'condo',
      userId: admins[1].id,
    },
    {
      title: 'Cozy Studio in Pangani',
      price: 25000,
      images: ['http://localhost:8800/uploads/house-inside5.jpg'],
      address: 'Pangani, Nairobi',
      city: 'Nairobi',
      bedroom: 1,
      bathroom: 1,
      latitude: '-1.2863',
      longitude: '36.8738',
      type: 'rent',
      property: 'apartment',
      userId: admins[0].id,
    },
    {
      title: 'Elegant House in Lavington',
      price: 80000,
      images: ['http://localhost:8800/uploads/house2.jpg','http://localhost:8800/uploads/house-inside15.jpg'],
      address: 'Lavington, Nairobi',
      city: 'Nairobi',
      bedroom: 4,
      bathroom: 3,
      latitude: '-1.3036',
      longitude: '36.7975',
      type: 'rent',
      property: 'house',
      userId: admins[1].id,
    },
    {
      title: 'Charming Apartment in Lang’ata',
      price: 45000,
      images: ['http://localhost:8800/uploads/house-inside6.jpg'],
      address: 'Lang’ata, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 1,
      latitude: '-1.3144',
      longitude: '36.7872',
      type: 'rent',
      property: 'apartment',
      userId: admins[0].id,
    },
    {
      title: 'Prime Plot in Juja',
      price: 120000,
      images: ['http://localhost:8800/uploads/house3.jpg'],
      address: 'Juja, Nairobi',
      city: 'Nairobi',
      latitude: '-1.1606',
      longitude: '37.0267',
      type: 'buy',
      property: 'land',
      userId: admins[1].id,
    },
    {
      title: 'Lovely Condo in Kilimani',
      price: 55000,
      images: ['http://localhost:8800/uploads/house-inside7.jpg','http://localhost:8800/uploads/house-inside14.jpg'],
      address: 'Kilimani, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 2,
      latitude: '-1.2925',
      longitude: '36.7879',
      type: 'rent',
      property: 'condo',
      userId: admins[0].id,
    },
    {
      title: 'Spacious House in Karen',
      price: 100000,
      images: ['http://localhost:8800/uploads/house6.jpg'],
      address: 'Karen, Nairobi',
      city: 'Nairobi',
      bedroom: 4,
      bathroom: 3,
      latitude: '-1.3125',
      longitude: '36.6800',
      type: 'buy',
      property: 'house',
      userId: admins[1].id,
    },
    {
      title: 'Modern Apartment in Nairobi CBD',
      price: 65000,
      images: ['http://localhost:8800/uploads/house-inside8.jpg','http://localhost:8800/uploads/house-inside13.jpg'],
      address: 'Nairobi CBD',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2864',
      longitude: '36.8172',
      type: 'rent',
      property: 'apartment',
      userId: admins[0].id,
    },
    {
      title: 'Newly Built House in Gikambura',
      price: 95000,
      images: ['http://localhost:8800/uploads/house4.jpg'],
      address: 'Gikambura, Nairobi',
      city: 'Nairobi',
      bedroom: 5,
      bathroom: 4,
      latitude: '-1.2331',
      longitude: '36.7852',
      type: 'buy',
      property: 'house',
      userId: admins[1].id,
    },
    {
      title: 'Luxury Condo in Riverside',
      price: 70000,
      images: ['http://localhost:8800/uploads/house-inside9.jpg','http://localhost:8800/uploads/house-inside12.jpg'],
      address: 'Riverside, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2961',
      longitude: '36.8111',
      type: 'rent',
      property: 'condo',
      userId: admins[0].id,
    },
    {
      title: 'Affordable House in Mombasa Road',
      price: 40000,
      images: ['http://localhost:8800/uploads/house7.jpg'],
      address: 'Mombasa Road, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.3114',
      longitude: '36.9320',
      type: 'rent',
      property: 'house',
      userId: admins[1].id,
    },
    {
      title: 'Prime Commercial Property in Westlands',
      price: 200000,
      images: ['http://localhost:8800/uploads/bulding1.jpg'],
      address: 'Westlands, Nairobi',
      city: 'Nairobi',
      latitude: '-1.2700',
      longitude: '36.8200',
      type: 'buy',
      property: 'commercial',
      userId: admins[0].id,
    },
    {
      title: 'Beautiful Land in Kangemi',
      price: 80000,
      images: ['http://localhost:8800/uploads/house3.jpg'],
      address: 'Kangemi, Nairobi',
      city: 'Nairobi',
      latitude: '-1.2736',
      longitude: '36.7935',
      type: 'buy',
      property: 'land',
      userId: admins[1].id,
    },
    {
      title: 'Elegant Apartment in Hurlingham',
      price: 50000,
      images: ['http://localhost:8800/uploads/house-inside10.jpg'],
      address: 'Hurlingham, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 1,
      latitude: '-1.2924',
      longitude: '36.8080',
      type: 'rent',
      property: 'apartment',
      userId: admins[0].id,
    },
    {
      title: 'Luxurious Villa in Gigiri',
      price: 180000,
      images: ['http://localhost:8800/uploads/house7.jpg'],
      address: 'Gigiri, Nairobi',
      city: 'Nairobi',
      bedroom: 6,
      bathroom: 5,
      latitude: '-1.2656',
      longitude: '36.8273',
      type: 'buy',
      property: 'villa',
      userId: admins[1].id,
    },
    {
      title: 'Cozy House in Nairobi South',
      price: 42000,
      images: ['http://localhost:8800/uploads/house2.jpg' ,'http://localhost:8800/uploads/house-inside11.jpg'],
      address: 'Nairobi South',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2750',
      longitude: '36.8040',
      type: 'rent',
      property: 'house',
      userId: admins[0].id,
    },
  ];

  await prisma.post.createMany({ data: posts });

  // Dummy chats and messages between each user and an admin
  for (const user of regularUsers) {
    for (const admin of admins) {
      await prisma.conversation.create({
        data: {
          user1Id: user.id,
          user2Id: admin.id,
          messages: {
            create: [
              {
                senderId: user.id,
                receiverId: admin.id,
                content: "Hello, how are you?",
              },
              {
                senderId: admin.id,
                receiverId: user.id,
                content: "I am good, thanks!",
              },
            ],
          },
        },
      });

      // const chat = await prisma.chat.create({
      //   data: {
      //     users: {
      //       connect: [{ id: user.id }, { id: admin.id }]
      //     }
      //   },
      // });

      // // Insert several messages for each chat
      // await prisma.message.createMany({
      //   data: [
      //     { content : 'Hello! How can I assist you today?', chatId: chat.id, userId: admin.id },
      //     { content : 'I am looking for a property in Nairobi.', chatId: chat.id, userId: user.id },
      //     { content : 'Sure, we have several options available.', chatId: chat.id, userId: admin.id },
      //     { content : 'Great! Could you tell me more about them?', chatId: chat.id, userId: user.id },
      //   ]
      // });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
