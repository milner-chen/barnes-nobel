# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Wishlist.destroy_all
    User.destroy_all
    Product.destroy_all
    Category.destroy_all
    CartItem.destroy_all
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('wishlists')
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('products')
    ApplicationRecord.connection.reset_pk_sequence!('categories')
    ApplicationRecord.connection.reset_pk_sequence!('cart_items')
  
    puts "Creating demo user..."
    # Create one user with an easy to remember username, email, and password:
    User.create!( 
      first_name: 'Demo',
      last_name: 'Lition',
      email: 'demo@user.io',
      password: 'password'
    )
    
    # More users
    # 10.times do 
    #   User.create!({
    #     first_name: Faker::Name.first_name,
    #     last_name: Faker::Name.last_name,
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end

    puts "Creating categories..."
    # 5.times do
    #   Category.create!({
    #     name: Faker::Book.genre.capitalize
    #   })
    # end
    Category.create!({name: "Fantasy"})
    Category.create!({name: "Science Fiction"})
    Category.create!({name: "Classics"})

    puts "Creating products..."

    ## fantasy
    product_1 = Product.create!({
      seller: "Rick Riordan",
      name: "The Lightning Thief (Percy Jackson and the Olympians Series #1)",
      price: 8.99,
      description: "Percy Jackson is a good kid, but he can't seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse—Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him.\nWhen Percy's mom finds out, she knows it's time that he knew the truth about where he came from, and that he go to the one place he'll be safe. She sends Percy to Camp Half Blood, a summer camp for demigods (on Long Island), where he learns that the father he never knew is Poseidon, god of the sea. Soon a mystery unfolds and together with his friends—one a satyr and the other the demigod daughter of Athena—Percy sets out on a quest across the United States to reach the gates of the Underworld (located in a recording studio in Hollywood) and prevent a catastrophic war between the gods.",
      category_id: 1,
      format: "Paperback",
      availability: "Available Online"
    })

    product_2 = Product.create!({
      seller: "The Hunger Games (Hunger Games Series #1)",
      name: "Suzanne Collins",
      price: 14.99,
      description: "Winning means fame and fortune. Losing means certain death. The Hunger Games have begun. . . . In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before-and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weigh survival against humanity and life against love.",
      category_id: 2,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    product_3 = Product.create!({
      seller: "Patrick Rothfuss",
      name: "The Name of the Wind (Kingkiller Chronicle Series #1)",
      price: 17.99,
      description: "This is the riveting first-person narrative of Kvothe, a young man who grows to be one of the most notorious magicians his world has ever seen. From his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a crime-riddled city, to his daringly brazen yet successful bid to enter a legendary school of magic, The Name of the Wind is a masterpiece that transports readers into the body and mind of a wizard.",
      category_id: 1,
      format: "Paperback",
      availability: "In Stock at My Store"
    })

    product_4 = Product.create!({
      seller: "Brandon Sanderson",
      name: "Mistborn: The Final Empire (Mistborn Series #1)",
      price: 31.99,
      description: "Once, a hero rose to save the world. He failed. For a thousand years since, the world has been a wasteland of ash and mist ruled by the immortal emperor known as the Lord Ruler. Every revolt has failed miserably. Yet somehow, hope survives. Hope that dares to dream of ending the empire and defeating the Lord Ruler. A new kind of uprising is being planned—one that depends on the cunning of a brilliant criminal mastermind and the determination of an unlikely heroine: a teenage street urchin named Vin. Once, a hero rose to save the world and failed. This time, can a young heroine succeed?",
      category_id: 1,
      format: "Hardcover",
      availability: "In Stock at My Store"
    })

    product_5 = Product.create!({
      seller: "J. K. Rowling",
      name: "Harry Potter and the Sorcerer's Stone (Harry Potter Series #1)",
      price: 10.99,
      description: "Harry Potter has never been the star of a Quidditch team, scoring points while riding a broom far above the ground. He knows no spells, has never helped to hatch a dragon, and has never worn a cloak of invisibility. 
      All he knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley - a great big swollen spoiled bully. Harry's room is a tiny closet at the foot of the stairs, and he hasn't had a birthday party in eleven years. 
      But all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place that Harry - and anyone who reads about him - will find unforgettable.",
      category_id: 1,
      format: "Paperback",
      availability: "Available Online"
    })

    product_6 = Product.create!({
      seller: "Rick Riordan",
      name: "The Red Pyramid (Kane Chronicles Series #1)",
      price: 8.99,
      description: "Since their mother’s death, Carter and Sadie have become near strangers. While Sadie has lived with her grandparents in London, her brother has traveled the world with their father, the brilliant Egyptologist, Dr. Julius Kane.
      One night, Dr. Kane brings the siblings together for a “research experiment” at the British Museum, where he hopes to set things right for his family. Instead, he unleashes the Egyptian god Set, who banishes him to oblivion and forces the children to flee for their lives.
      Soon, Sadie and Carter discover that the gods of Egypt are waking, and the worst of them—Set–has his sights on the Kanes. To stop him, the siblings embark on a dangerous journey across the globe — a quest that brings them ever closer to the truth about their family, and their links to a secret order that has existed since the time of the pharaohs.",
      category_id: 1,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    product_7 = Product.create!({
      seller: "J. R. R. Tolkien",
      name: "The Hobbit",
      price: 15.49,
      description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum.",
      category_id: 1,
      format: "Paperback",
      availability: "In Stock at My Store"
    })

    product_8 = Product.create!({
      seller: "Kristin Cashore",
      name: "Graceling (Graceling Realm Series #1)",
      price: 19.99,
      description: "Graceling tells the story of Katsa, who lives in the Seven Kingdoms where selected people are born with a Grace, a special talent that can be anything at all. Katsa’s Grace is killing. 
      As the king’s niece, she is forced to use her extreme skills as his brutal enforcer. Until the day she meets Prince Po, who is Graced with combat skills, and Katsa’s life begins to change. She never expects to become Po’s friend. She never expects to learn a new truth about her own Grace—or about a terrible secret that lies hidden far away . . . a secret that could destroy all seven kingdoms with words alone.",
      category_id: 1,
      format: "Hardcover",
      availability: "Store Pickup Available"
    })

    product_9 = Product.create!({
      seller: "Sarah Prineas",
      name: "The Magic Thief (Magic Thief Series #1)",
      price: 7.99,
      description: "In a city that runs on a dwindling supply of magic, a young boy is drawn into a life of wizardry and adventure. Conn should have dropped dead the day he picked Nevery's pocket and touched the wizard's locus magicalicus, a stone used to focus magic and work spells. But for some reason he did not. Nevery finds that interesting, and he takes Conn as his apprentice on the provision that the boy find a locus stone of his own. But Conn has little time to search for his stone between wizard lessons and helping Nevery discover who—or what—is stealing the city of Wellmet's magic.",
      category_id: 1,
      format: "Paperback",
      availability: "Available Online"
    })

    product_10 = Product.create!({
      seller: "V. E. Schwab",
      name: "A Darker Shade of Magic (Shades of Magic Series #1)",
      price: 17.99,
      description: "Kell is one of the last Antari—magicians with a rare, coveted ability to travel between parallel Londons; Red, Grey, White, and, once upon a time, Black.

      Kell was raised in Arnes—Red London—and officially serves the Maresh Empire as an ambassador, traveling between the frequent bloody regime changes in White London and the court of George III in the dullest of Londons, the one without any magic left to see.
      
      Unofficially, Kell is a smuggler, servicing people willing to pay for even the smallest glimpses of a world they'll never see. It's a defiant hobby with dangerous consequences, which Kell is now seeing firsthand.
      
      After an exchange goes awry, Kell escapes to Grey London and runs into Delilah Bard, a cut-purse with lofty aspirations. She first robs him, then saves him from a deadly enemy, and finally forces Kell to spirit her to another world for a proper adventure.
      
      Now perilous magic is afoot, and treachery lurks at every turn. To save all of the worlds, they'll first need to stay alive.",
      category_id: 1,
      format: "Paperback",
      availability: "Available Online"
    })
    
    product_11 = Product.create!({
      seller: "Erin Morgenstern",
      name: "The Night Circus",
      price: 13.99,
      description: "The circus arrives without warning. No announcements precede it. It is simply there, when yesterday it was not. Within the black-and-white striped canvas tents is an utterly unique experience full of breathtaking amazements. It is called Le Cirque des Rêves, and it is only open at night.

      But behind the scenes, a fierce competition is underway: a duel between two young magicians, Celia and Marco, who have been trained since childhood expressly for this purpose by their mercurial instructors. Unbeknownst to them both, this is a game in which only one can be left standing. Despite the high stakes, Celia and Marco soon tumble headfirst into love, setting off a domino effect of dangerous consequences, and leaving the lives of everyone, from the performers to the patrons, hanging in the balance.",
      category_id: 1,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    ## sci-fi
    product_12 = Product.create({
      seller: "James Patterson",
      name: "The Angel Experiment (Maximum Ride Series #1)",
      price: 10.99,
      description: "This new incarnation of the multi-million copy-selling Maximum Ride series is the perfect way to discover the blockbuster adventures of a heroic flock of winged kids!\nThis volume contains the complete story of the series' launch title, The Angel Experiment. Fourteen-year-old Maximum Ride, better known as Max, knows what it's like to soar above the world. She and all the members of the \"flock\"—Fang, Iggy, Nudge, Gasman and Angel—are just like ordinary kids, only they have wings and can fly. It may seem like a dream come true to some, but their lives can morph into a living nightmare at any time—like when Angel, the youngest member of the flock, is kidnapped and taken back to the \"School\" where she and the others were experimented on by a crew of sinister scientists. It's the beginning of an epic tale that races, rocks and rolls toward an astounding apocalyptic event in the fourth volume, Nevermore!",
      category_id: 2,
      format: "Paperback",
      availability: "Available Online"
    })

    product_13 = Product.create!({
      seller: "James Dashner",
      name: "The Maze Runner (Maze Runner Series #1)",
      price: 10.99,
      description: "  When Thomas wakes up in the lift, the only thing he can remember is his name. He’s surrounded by strangers—boys whose memories are also gone.
      Outside the towering stone walls that surround them is a limitless, ever-changing maze. It’s the only way out—and no one’s ever made it through alive.
      Then a girl arrives. The first girl ever. And the message she delivers is terrifying: Remember. Survive. Run.
   ",
      category_id: 2,
      format: "Paperback",
      availability: "Available Online"
    })

    product_14 = Product.create!({
      seller: "Veronica Roth",
      name: "Divergent (Divergent Series #1)",
      price: 10.99,
      description: "One choice can transform you. Beatrice Prior's society is divided into five factions—Candor (the honest), Abnegation (the selfless), Dauntless (the brave), Amity (the peaceful), and Erudite (the intelligent). Beatrice must choose between staying with her Abnegation family and transferring factions.

      Her choice will shock her community and herself. But the newly christened Tris also has a secret, one she's determined to keep hidden, because in this world, what makes you different makes you dangerous.",
      category_id: 2,
      format: "Paperback",
      availability: "Store Pickup Available"
    })
    
    product_15 = Product.create!({
      seller: "Cixin Liu",
      name: "The Three-Body Problem (Three-Body Problem Series #1)",
      price: 17.99,
      description: "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens. An alien civilization on the brink of destruction captures the signal and plans to invade Earth. Meanwhile, on Earth, different camps start forming, planning to either welcome the superior beings and help them take over a world seen as corrupt, or to fight against the invasion. The result is a science fiction masterpiece of enormous scope and vision",
      category_id: 2,
      format: "Paperback",
      availability: "Available Online"
    })

    product_16 = Product.create!({
      seller: "Douglas Adams",
      name: "The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide Series #1)",
      price: 14.99,
      description: "It’s an ordinary Thursday morning for Arthur Dent . . . until his house gets demolished. The Earth follows shortly after to make way for a new hyperspace express route, and Arthur’s best friend has just announced that he’s an alien.

      After that, things get much, much worse.
      
      With just a towel, a small yellow fish, and a book, Arthur has to navigate through a very hostile universe in the company of a gang of unreliable aliens. Luckily the fish is quite good at languages. And the book is The Hitchhiker’s Guide to the Galaxy . . . which helpfully has the words DON’T PANIC inscribed in large, friendly letters on its cover.",
      category_id: 2,
      format: "Paperback",
      availability: "Available Online"
    })

    product_17 = Product.create!({
      seller: "Mary Shelley",
      name: "Frankenstein",
      price: 9.99,
      description: "Famously written on a dare by the author’s famous friend, poet Lord Byron, this bloodcurdling Gothic horror novel is one of the most haunting stories of all time. It recounts the tragic events in the life of young doctor Frankenstein and the dreadful consequences of his attempt at creating artificial life. More than 100 years after its publication, it remains a brilliant and essential reflection on scientific ethics, as well a literary masterpiece.",
      category_id: 2,
      format: "Paperback",
      availability: "Store Pickup Available"
    })


    product_18 = Product.create!({
      seller: "Andy Weir",
      name: "The Martian",
      price: 14.99,
      description: "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars.

      Now, he's sure he'll be the first person to die there.
      
      After a dust storm nearly kills him and forces his crew to evacuate while thinking him dead, Mark finds himself stranded and completely alone with no way to even signal Earth that he’s alive—and even if he could get word out, his supplies would be gone long before a rescue could arrive.
      
      Chances are, though, he won't have time to starve to death. The damaged machinery, unforgiving environment, or plain-old \"human error\" are much more likely to kill him first.
      
      But Mark isn't ready to give up yet. Drawing on his ingenuity, his engineering skills—and a relentless, dogged refusal to quit—he steadfastly confronts one seemingly insurmountable obstacle after the next. Will his resourcefulness be enough to overcome the impossible odds against him?",
      category_id: 2,
      format: "Paperback",
      availability: "Available Online"
    })

    product_19 = Product.create!({
      seller: "N. K. Jemisin",
      name: "The Fifth Season (Broken Earth Series #1",
      price: 16.99,
      description: "This is the way the world ends. . .for the last time.

      It starts with the great red rift across the heart of the world's sole continent, spewing ash that blots out the sun. It starts with death, with a murdered son and a missing daughter. It starts with betrayal, and long dormant wounds rising up to fester.
      
      This is the Stillness, a land long familiar with catastrophe, where the power of the earth is wielded as a weapon. And where there is no mercy.",
      category_id: 2,
      format: "Paperback",
      availability: "Available Online"
    })

    product_20 = Product.create!({
      seller: "Max Brooks",
      name: "World War Z: An Oral History of the Zombie War",
      price: 14.99,
      description: "The Zombie War came unthinkably close to eradicating humanity. Max Brooks, driven by the urgency of preserving the acid-etched first-hand experiences of the survivors, traveled across the United States of America and throughout the world, from decimated cities that once teemed with upwards of thirty million souls to the most remote and inhospitable areas of the planet. He recorded the testimony of men, women, and sometimes children who came face-to-face with the living, or at least the undead, hell of that dreadful time. World War Z is the result. Never before have we had access to a document that so powerfully conveys the depth of fear and horror, and also the ineradicable spirit of resistance, that gripped human society through the plague years.",
      category_id: 2,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    # classics
    product_21 = Product.create!({
      seller: "F. Scott Fitzgerald",
      name: "The Great Gatsby",
      price: 13.99,
      description: "Nick learns that his married cousin Daisy and his neighbor Gatsby were once in love, and he agrees to help Gatsby meet with Daisy. Gatsby and Daisy begin an affair. After Tom confronts Daisy and Gatsby, Daisy accidentally kills Tom’s mistress with Gatsby’s car. Gatsby takes the blame for the accident. Tom identifies Gatsby to his mistress’s husband, who proceeds to hunt Gatsby down and kill him for revenge.",
      category_id: 3,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    product_22 = Product.create!({
      seller: "J. D. Salinger",
      name: "The Catcher in the Rye",
      price: 15.99,
      description: "\"If you really want to hear about it, the first thing you'll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don't feel like going into it, if you want to know the truth.\"
      The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caufield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.
      ",
      category_id: 3,
      format: "Paperback",
      availability: "Available Online"
    })

    product_23 = Product.create!({
      seller: "Paulo Coelho",
      name: "The Alchemist",
      price: 14.99,
      description: "Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.

      Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago's journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life's path, and, most importantly, to follow our dreams.",
      category_id: 3,
      format: "Paperback",
      availability: "Available Online"
    })

    product_24 = Product.create!({
      seller: "George Orwell",
      name: "1984",
      price: 8.99,
      description: "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...

      A startling and haunting novel, 1984 creates an imaginary world that is completely convincing from start to finish. No one can deny the novel’s hold on the imaginations of whole generations, or the power of its admonitions—a power that seems to grow, not lessen, with the passage of time.",
      category_id: 3,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    product_25 = Product.create!({
      seller: "Lois Lowry",
      name: "The Giver",
      price: 9.99,
      description: "Life in the community where Jonas lives is idyllic. Designated birthmothers produce newchildren, who are assigned to appropriate family units. Citizens are assigned their partners and their jobs. No one thinks to ask questions. Everyone obeys. Everyone is the same. Except Jonas.

      Not until he is given his life assignment as the Receiver of Memory does he begin to understand the dark, complex secrets behind his fragile community. Gradually Jonas learns that power lies in feelings. But when his own power is put to the test—when he must try to save someone he loves—he may not be ready. Is it too soon? Or too late?",
      category_id: 3,
      format: "Paperback",
      availability: "Available Online"
    })

    product_26 = Product.create!({
      seller: "Ray Bradbury",
      name: "Fahrenheit 451",
      price: 13.99,
      description: "Guy Montag is a fireman. In his world, where television rules and literature is on the brink of extinction, firemen start fires rather than put them out. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden.
      Montag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television “family.” But then he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people didn’t live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television.
      When Mildred attempts suicide and Clarisse suddenly disappears, Montag begins to question everything he has ever known. He starts hiding books in his home, and when his pilfering is discovered, the fireman has to run for his life.",
      category_id: 3,
      format: "Paperback",
      availability: "Available Online"
    })

    product_27 = Product.create!({
      seller: "Khaled Hosseini",
      name: "The Kite Runner",
      price: 14.49,
      description: "The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father’s servant, caught in the tragic sweep of history, The Kite Runner transports readers to Afghanistan at a tense and crucial moment of change and destruction. A powerful story of friendship, it is also about the power of reading, the price of betrayal, and the possibility of redemption; and an exploration of the power of fathers over sons—their love, their sacrifices, their lies.",
      category_id: 3,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    product_28 = Product.create!({
      seller: "William Golding",
      name: "Lord of the Flies",
      price: 8.99,
      description: "At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate; this far from civilization the boys can do anything they want. Anything. They attempt to forge their own society, failing, however, in the face of terror, sin and evil. And as order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far from reality as the hope of being rescued.",
      category_id: 3,
      format: "Paperback",
      availability: "Available Online"
    })

    product_29 = Product.create!({
      seller: "Antoine de Saint-Exupery",
      name: "The Little Prince",
      price: 11.99,
      description: "A pilot crashes in the Sahara Desert and encounters a strange young boy who calls himself the Little Prince. The Little Prince has traveled there from his home on a lonely, distant asteroid with a single rose. The story that follows is a beautiful and at times heartbreaking meditation on human nature.",
      category_id: 3,
      format: "Paperback",
      availability: "Store Pickup Available"
    })

    
    product_30 = Product.create!({
      seller: "Markus Zusak",
      name: "The Book Thief",
      price: 12.99,
      description: "When Death has a story to tell, you listen.

      It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will become busier still.
      
      Liesel Meminger is a foster girl living outside of Munich, who scratches out a meager existence for herself by stealing when she encounters something she can’t resist–books. With the help of her accordion-playing foster father, she learns to read and shares her stolen books with her neighbors during bombing raids as well as with the Jewish man hidden in her basement.",
      category_id: 3,
      format: "Paperback",
      availability: "Available Online"
    })

    # product_ = Product.create!({
    #   seller: "",
    #   name: "",
    #   price: ,
    #   description: "",
    #   category_id: ,
    #   format: "",
    #   availability: ""
    # })

    puts "Done with instances!"
  # end


  # product_1.photo.attach(
  #   io: URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/photo_1.webp"),
  #   filename: "photo_1.webp"
  # )

  Product.first(8).each_with_index do |product, index|
    product.photo.attach(
      io: URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/photo_#{index + 1}.webp"),
      filename: "photo_#{index + 1}.webp"
    )
  end

  # for magic thief
  Product.find(9).photo.attach(
    io: URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/photo_9.jpg"),
    filename: "photo_9.jpg"
  )

  (10..26).to_a.each do |index|
    product = Product.find(index)
    product.photo.attach(
      io: URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/photo_#{index}.webp"),
      filename: "photo_#{index + 1}.webp"
    )
  end

  Product.find(27).photo.attach(
    io: URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/photo_27.jpg"),
    filename: "photo_9.jpg"
  )

  (28..30).to_a.each do |index|
    product = Product.find(index)
    product.photo.attach(
      io: URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/photo_#{index}.webp"),
      filename: "photo_#{index + 1}.webp"
    )
  end

  puts "Done with photos"
