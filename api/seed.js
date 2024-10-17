import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.message.deleteMany({});
  await prisma.chat.deleteMany({});
  await prisma.savedPost.deleteMany({});
  await prisma.postDetail.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // Function to hash passwords
  const hashPassword = async (password) => {
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  // Dummy users
  const users = [
    {
      email: 'houstin00@gmail.com',
      username: 'Houstin',
      role: 'ADMIN',
      password: await hashPassword('password'),
      avatar: 'http://localhost:8800/uploads/20f8b6e2-cf2b-4abf-8154-d571521846c5.jpg',
    },
    {
      email: 'money@mail.com',
      username: 'money',
      password: await hashPassword('password'),
      avatar: 'http://localhost:8800/uploads/c37e305a-0e71-40d8-be4c-8bbdb4bc9a5d.jpg',
    },
    {
      email: 'terry@mail.com',
      username: 'Terry',
      password: await hashPassword('password'),
    },
    {
      email: 'admin@example.com',
      username: 'admin',
      password: await hashPassword('password'),
      role: 'ADMIN',
      avatar: 'http://localhost:8800/uploads/a9f1ad39-6930-4508-b26d-5fbcca5d2009.jpg',
    },
  ];

  await prisma.user.createMany({ data: users });

  // Retrieve the created users to access their IDs
  const createdUsers = await prisma.user.findMany({
    where: {
      email: { in: users.map((user) => user.email) },
    },
  });

  // Dummy posts with locations around Nairobi
  const posts = [
    {
      title: 'Modern Apartment in Westlands',
      price: 50000,
      images: ['http://localhost:8800/uploads/house_inside3.jpg'],
      address: 'Westlands, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2667',
      longitude: '36.8056',
      type: 'rent',
      property: 'apartment',
      userId: createdUsers[0].id,
    },
    {
      title: 'Luxury Villa in Karen',
      price: 150000,
      images: ['http://localhost:8800/uploads/karen_villa.jpg'],
      address: 'Karen, Nairobi',
      city: 'Nairobi',
      bedroom: 5,
      bathroom: 4,
      latitude: '-1.3146',
      longitude: '36.6809',
      type: 'buy',
      property: 'house',
      userId: createdUsers[1].id,
    },
    {
      title: 'Affordable Condo in Ruaka',
      price: 35000,
      images: ['http://localhost:8800/uploads/ruaka_condo.jpg'],
      address: 'Ruaka, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 1,
      latitude: '-1.2092',
      longitude: '36.7920',
      type: 'rent',
      property: 'condo',
      userId: createdUsers[2].id,
    },
    {
      title: 'Spacious Land in Ruiru',
      price: 100000,
      images: ['http://localhost:8800/uploads/ruiru_land.jpg'],
      address: 'Ruiru, Nairobi',
      city: 'Nairobi',
      latitude: '-1.1551',
      longitude: '37.0074',
      type: 'buy',
      property: 'land',
      userId: createdUsers[1].id,
    },
    {
      title: '2 Bedroom Apartment in Kilimani',
      price: 60000,
      images: ['http://localhost:8800/uploads/kilimani_apartment.jpg'],
      address: 'Kilimani, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 2,
      latitude: '-1.2921',
      longitude: '36.7801',
      type: 'rent',
      property: 'apartment',
      userId: createdUsers[0].id,
    },
    {
      title: 'Stylish Condo in Kileleshwa',
      price: 55000,
      images: ['http://localhost:8800/uploads/kileleshwa_condo.jpg'],
      address: 'Kileleshwa, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2735',
      longitude: '36.7695',
      type: 'rent',
      property: 'condo',
      userId: createdUsers[2].id,
    },
    {
      title: 'Cozy Studio in Pangani',
      price: 25000,
      images: ['http://localhost:8800/uploads/pangani_studio.jpg'],
      address: 'Pangani, Nairobi',
      city: 'Nairobi',
      bedroom: 1,
      bathroom: 1,
      latitude: '-1.2863',
      longitude: '36.8738',
      type: 'rent',
      property: 'apartment',
      userId: createdUsers[3].id,
    },
    {
      title: 'Elegant House in Lavington',
      price: 80000,
      images: ['http://localhost:8800/uploads/lavington_house.jpg'],
      address: 'Lavington, Nairobi',
      city: 'Nairobi',
      bedroom: 4,
      bathroom: 3,
      latitude: '-1.3036',
      longitude: '36.7975',
      type: 'rent',
      property: 'house',
      userId: createdUsers[0].id,
    },
    {
      title: 'Charming Apartment in Lang’ata',
      price: 45000,
      images: ['http://localhost:8800/uploads/langata_apartment.jpg'],
      address: 'Lang’ata, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 1,
      latitude: '-1.3144',
      longitude: '36.7872',
      type: 'rent',
      property: 'apartment',
      userId: createdUsers[1].id,
    },
    {
      title: 'Prime Plot in Juja',
      price: 120000,
      images: ['http://localhost:8800/uploads/juja_plot.jpg'],
      address: 'Juja, Nairobi',
      city: 'Nairobi',
      latitude: '-1.1606',
      longitude: '37.0267',
      type: 'buy',
      property: 'land',
      userId: createdUsers[2].id,
    },
    {
      title: 'Lovely Condo in Kilimani',
      price: 55000,
      images: ['http://localhost:8800/uploads/kilimani_condo.jpg'],
      address: 'Kilimani, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 2,
      latitude: '-1.2925',
      longitude: '36.7879',
      type: 'rent',
      property: 'condo',
      userId: createdUsers[3].id,
    },
    {
      title: 'Spacious House in Karen',
      price: 100000,
      images: ['http://localhost:8800/uploads/karen_house.jpg'],
      address: 'Karen, Nairobi',
      city: 'Nairobi',
      bedroom: 4,
      bathroom: 3,
      latitude: '-1.3125',
      longitude: '36.6800',
      type: 'buy',
      property: 'house',
      userId: createdUsers[0].id,
    },
    {
      title: 'Modern Apartment in Nairobi CBD',
      price: 65000,
      images: ['http://localhost:8800/uploads/nairobi_cbd_apartment.jpg'],
      address: 'Nairobi CBD',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2864',
      longitude: '36.8172',
      type: 'rent',
      property: 'apartment',
      userId: createdUsers[1].id,
    },
    {
      title: 'Newly Built House in Gikambura',
      price: 95000,
      images: ['http://localhost:8800/uploads/gikambura_house.jpg'],
      address: 'Gikambura, Nairobi',
      city: 'Nairobi',
      bedroom: 5,
      bathroom: 4,
      latitude: '-1.2331',
      longitude: '36.7852',
      type: 'buy',
      property: 'house',
      userId: createdUsers[2].id,
    },
    {
      title: 'Luxury Condo in Riverside',
      price: 70000,
      images: ['http://localhost:8800/uploads/riverside_condo.jpg'],
      address: 'Riverside, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2961',
      longitude: '36.8111',
      type: 'rent',
      property: 'condo',
      userId: createdUsers[3].id,
    },
    {
      title: 'Affordable House in Mombasa Road',
      price: 40000,
      images: ['http://localhost:8800/uploads/mombasa_road_house.jpg'],
      address: 'Mombasa Road, Nairobi',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.3114',
      longitude: '36.9320',
      type: 'rent',
      property: 'house',
      userId: createdUsers[0].id,
    },
    {
      title: 'Prime Commercial Property in Westlands',
      price: 200000,
      images: ['http://localhost:8800/uploads/westlands_commercial.jpg'],
      address: 'Westlands, Nairobi',
      city: 'Nairobi',
      latitude: '-1.2700',
      longitude: '36.8200',
      type: 'buy',
      property: 'commercial',
      userId: createdUsers[1].id,
    },
    {
      title: 'Beautiful Land in Kangemi',
      price: 80000,
      images: ['http://localhost:8800/uploads/kangemi_land.jpg'],
      address: 'Kangemi, Nairobi',
      city: 'Nairobi',
      latitude: '-1.2736',
      longitude: '36.7935',
      type: 'buy',
      property: 'land',
      userId: createdUsers[2].id,
    },
    {
      title: 'Elegant Apartment in Hurlingham',
      price: 50000,
      images: ['http://localhost:8800/uploads/hurlingham_apartment.jpg'],
      address: 'Hurlingham, Nairobi',
      city: 'Nairobi',
      bedroom: 2,
      bathroom: 1,
      latitude: '-1.2924',
      longitude: '36.8080',
      type: 'rent',
      property: 'apartment',
      userId: createdUsers[3].id,
    },
    {
      title: 'Luxurious Villa in Gigiri',
      price: 180000,
      images: ['http://localhost:8800/uploads/gigiri_villa.jpg'],
      address: 'Gigiri, Nairobi',
      city: 'Nairobi',
      bedroom: 6,
      bathroom: 5,
      latitude: '-1.2656',
      longitude: '36.8273',
      type: 'buy',
      property: 'villa',
      userId: createdUsers[0].id,
    },
    {
      title: 'Cozy House in Nairobi South',
      price: 42000,
      images: ['http://localhost:8800/uploads/nairobi_south_house.jpg'],
      address: 'Nairobi South',
      city: 'Nairobi',
      bedroom: 3,
      bathroom: 2,
      latitude: '-1.2750',
      longitude: '36.8040',
      type: 'rent',
      property: 'house',
      userId: createdUsers[1].id,
    },
  ];

  await prisma.post.createMany({ data: posts });

  // Dummy chats
  const chats = await prisma.chat.create({
    data: {
      users: { connect: [{ id: createdUsers[0].id }, { id: createdUsers[1].id }] },
      messages: {
        create: [
          {
            text: 'Hey, how is the apartment in Westlands?',
            userId: createdUsers[0].id,
          },
          {
            text: 'It’s great! Can I come for a viewing tomorrow?',
            userId: createdUsers[1].id,
          },
        ],
      },
      lastMessage: 'It’s great! Can I come for a viewing tomorrow?',
    },
  });

  const chats2 = await prisma.chat.create({
    data: {
      users: { connect: [{ id: createdUsers[1].id }, { id: createdUsers[2].id }] },
      messages: {
        create: [
          {
            text: 'Is the land in Ruiru still available?',
            userId: createdUsers[1].id,
          },
          {
            text: 'Yes, it’s available for immediate purchase.',
            userId: createdUsers[2].id,
          },
        ],
      },
      lastMessage: 'Yes, it’s available for immediate purchase.',
    },
  });

  const chats3 = await prisma.chat.create({
    data: {
      users: { connect: [{ id: createdUsers[2].id }, { id: createdUsers[0].id }] },
      messages: {
        create: [
          {
            text: 'Can I view the condo in Kileleshwa today?',
            userId: createdUsers[2].id,
          },
          {
            text: 'Sure, I’m available after 3 PM.',
            userId: createdUsers[0].id,
          },
        ],
      },
      lastMessage: 'Sure, I’m available after 3 PM.',
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
