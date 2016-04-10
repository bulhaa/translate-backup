package com.gmail.freestyle_reunion;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Collection;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.LinkedList;

import javax.ws.rs.container.ContainerResponseFilter;


public class Translator {
	
	   // JDBC driver name and database URL
	   static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	   static final String DB_URL = "jdbc:mysql://adminCKxpiud:798NmWKjAKXD@127.3.140.2:3306/";

	   //  Database credentials
	   static final String USER = "adminCKxpiud";
	   static final String PASS = "798NmWKjAKXD";

	static Hashtable<Integer, Rule> rules = new Hashtable<Integer, Rule>();
	static Hashtable<String, Definition> definitions = new Hashtable<String, Definition>();
	static Hashtable<String, Definition> wordToWord = new Hashtable<String, Definition>();
	static String DictionaryStr = "cat ބުޅާ  1 "
+"threw އެއްލި  2 "
+"ball ބޯޅަ  1 "
+"welcome މަރުހަބާ  3 " 
+"to   4 "
+"the   5 "
+"new އާ  6 "
+"generation ޖީލު  1 "
+"of ގެ  7 "
+"axis އެކްސިސް  1 "


+"victory ވިކްޓްރީ  1 "
+"sports ސްޕޯޓްސް  1 "
+"club ކްލަބް  1 "
+"and އަދި  3 "
+"valencia ވެލެންސިޔާ  1 "
+"'s ގެ  3 "
+"draw އެއްވަރު  3 "
+"in ގައި  3 "
+"ooredoo އުރީދު  1 "
+"dhivehi ދިވެހި  1 "
+"premier ޕްރިމިއަރ  6 "
+"league ލީގު  1 "
+"friday ފްރައިޑޭ  1 "
+"night ރޭ  1 "
+"match މެޗް  1 "
+"has ވަނީ  3 "
+"heated ވާދަވެރި  6 "
+"up މަތި  3 "
+"race ރޭސް  1 "
+"for ގެ  3 "
+"top ގަދަ  6 "


+"mouse މީދާ  1 "
+"house ގެ  1 "
+"ministry މިނިސްޓްރީ  1 "
+"statistics ތަފާސްހިސާބްތައް  1 "
+"also ވެސް  4 "
+"show ދައްކާ  2 "
+"tourists ފަތުރުވެރިން  1 "
+"maldives ދިވެހިރާއްޖެ  1 "
+"this މި  4 "
+"year އަހަރު  1 "
+"which މި  4 "
+"is އަކީ  4 "
+"increase އިތުރު  2 "
+"percent އިންސައްތަ  1 "
	+"from އިން  4 "
+"visited ޒިޔާރަތްކުރި  2 "
+"indicate ދައްކާގޮތުން  2 "
+"resort ރިސޯޓު  1 "
+"occupancy އޮކިޔުޕެންސީ  1 "
+"rates ރޭޓު  1 "
+"decreased ދައްވި  2 "
+"last އެންމެފަހު  1 "
+"month މަހު  1 "
+"lower ދަށް  2 "
+"than ވުރެ  4 "
+"full ފުރިހަމަ  1 "
+"access އެކްސެސް  1 "
+"have ހޯދުމަށް  2 "
+"features ޚިދުމަތްތައް  1 "
+"available ލިބެންހުރި  1 ";
	//+"";
	
//	Victory Sports Club and Club Valencia’s draw in the Ooredoo Dhivehi 
//	Premier League’s Friday night match has heated up the race for the 
//	League’s Top 6
//	
	
	static String RulesStr = "-1 1 -2 2 1 0 1 3 2\n"
+"-1 1 3 -3 0 2 1 0 1 1\n"
+"-2 1 1 1 0 1 2\n"
+"-2 2 1 0 1\n"
+"-3 1 4 -4 0 2 1 0 1 2\n"
+"-4 1 -5 -6 0 2 1\n"
+"-4 2 -5 0 1\n"
+"-5 1 5 6 1 0 2 3\n"
+"-5 2 6 1 0 1 2\n"
+"-5 3 5 1 0 2\n"
+"-5 4 1 0 1\n"
+"-6 1 7 -5 0 2 1\n";
	
	static boolean dataImported = false;
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		String eText = "Welcome to the new generation of Axis";
		
//		String eText = "The statistics also indicate that resort occupancy"
//				+ " rates had decreased 79.9 percent last month, which "
//				+ "is 8.8 percent lower than last year";
		
		String eText = "Victory Sports Club and Club Valencia’s draw in the"
				+ " Ooredoo Dhivehi Premier League’s Friday night match has"
				+ " heated up the race for the League’s Top. 6";
		
		//		އެކްސިސްގެ އާ ޖީލަށް މަރުހަބާ
//		String eText = "cat threw ball";
		
		System.out.println(translate(eText.split("\\s"), -1).translatedText);
	} 
	
	
	
/*	public static void importData(){
		dataImported = true;
		for (int i = 0; i < rules1.length; i++) {
			rules.put(i, rules1[i]);
		}
		
		for (int i = 0; i < definitions1.length; i++) {
			definitions.put(definitions1[i].geteText()+ definitions1[i].getType(), definitions1[i]);
		}
		
		for (int i = 0; i < definitions1.length; i++) {
			wordToWord.put(definitions1[i].geteText(), definitions1[i]);
		}
	}*/
	
	public static TranslateInfo translate(String[] gText, int type){
		if(!dataImported)
			importDictionary();
		
		if(type == -1){
			String tText = "";
			for (int i = 0; i < gText.length; i++)
				tText+= gText[i]+ " ";
			
			tText = tText.replaceAll("'s ", " 's ");
			tText = tText.replaceAll("’s ", " 's ");
			tText = tText.replaceAll("[^\\w' ]", "");
			
			gText = tText.split("\\s");
			tText = "";
			
			/*			try {

				
				Resource resource = getClass().getClassLoader().getResourceAsStream("test.arff");
				String arffPathRaw = resource.getURI().toString(); // returns file:/path/to/file
				String arffPath = arffPathRaw.replace("file:/", ""); // pure file path
				
				InputStream is;
					is = new FileInputStream("en-token.bin");

				TokenizerModel model;
					model = new TokenizerModel(is);

				Tokenizer tokenizer = new TokenizerME(model);
			 
				gText = tokenizer.tokenize(tText);
			 
				is.close();			
			} catch (FileNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (InvalidFormatException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			*/
		}
		
		LinkedList<Definition> lDefinitions = new LinkedList<Definition>();
		Rule lRule = null;
		LinkedList<Rule> lRules = new LinkedList<Rule>();
		LinkedList<Definition[]> definitionStore = new LinkedList<Definition[]>();
		Definition[] DefinitionArr = null;
		int iTextLen = 0; // inner recursive length
		
		String dText = "";
		
		Collection<Rule> r = (Collection<Rule>) rules.values();
		for (Iterator<Rule> iterator = r.iterator(); iterator.hasNext();) {
			lDefinitions = new LinkedList<Definition>();				
			lRule = (Rule) iterator.next();
			if(lRule.getType() != type)
				continue;
			int[] pattern = lRule.getPattern();
						
			for (int i = 0, textPos = 0; i < pattern.length; i++) {
				Definition d = null;
				
				if(pattern[i]>0){
					// check whether word definition is present
					if(textPos < gText.length)
						d = definitions.get(gText[textPos++].toLowerCase()+ pattern[i]);
				}else{
					String[] lText = new String[gText.length-textPos];
					for (int j = textPos; j < gText.length; j++) {
						lText[j-textPos] = gText[j];
					}
					
					TranslateInfo ti = translate(lText, pattern[i]);
					if(ti != null){
						d = new Definition(null, ti.translatedText, 0);
						textPos += ti.wordCount;
						iTextLen += ti.wordCount-1;
					}
				}
				
				if(d == null){
					break;
				}
				lDefinitions.add(d);
				
				/*				
				 * if end of pattern is reached for a rule other than 
				 * root rule
				 * or end of patter is reached and end of text is also reached
				 * for the root rule
				*/
				if(i == pattern.length-1 && (type!=-1 || textPos>=gText.length)){
					lRules.add(lRule);
					definitionStore.add((Definition[]) lDefinitions.toArray(new Definition[0]));
				}
			}
		}
		
		
		if(lRules.size()>0){
			lRule = lRules.get(0);
			DefinitionArr = definitionStore.get(0);
			for (int i = 0; i < lRules.size(); i++) {
				if(lRules.get(i).precedence < lRule.precedence){
					lRule = lRules.get(i);
					DefinitionArr = definitionStore.get(i);
				}
			}
		}else
			lRule = null;
				
		if(lRule!=null){
			int[] order = lRule.getOrder();
			Definition[] tDefinitions = new Definition[order.length];
			for (int i = 0; i < lRule.getOrder().length; i++) {
				tDefinitions[i] = DefinitionArr[order[i]-1];
			}
			
			DefinitionArr = tDefinitions;
			
			
			NanoRule[] tr = lRule.getTransformations();
			
			for (int i = 0; i < tr.length; i++) {
				NanoRule nanoRule = tr[i];
				
				dText = nanoTransformation(DefinitionArr, nanoRule);
			}
			
			if(tr.length==0)
				for (int i = 0; i < DefinitionArr.length; i++)
					dText+= DefinitionArr[i].getdText()+ " ";
			
			dText= dText.substring(0, dText.length()-1);
			
			return new TranslateInfo(dText, lRule.getPattern().length+
					iTextLen);
		}
		else{
			if(type==-1){
				for (int i = 0; i < gText.length; i++) {
					Definition d = wordToWord.get(gText[i]);
					if(d!=null)
						dText+= d.getdText()+ " ";
					else
						dText+= gText[i]+ " ";
				}
				dText+= "\nWord to word translation!";
				return new TranslateInfo(dText, 0);
			}else
				return null;
		}
	}
	
	public static String nanoTransformation(Definition[] definitions, NanoRule rule){
		String text = "";
		
		for (int i = 0; i < definitions.length; i++) {
			definitions[i].setdText(definitions[i].getdText()+ " ");
		}
		
		switch (rule.transformation) {
		case 1:
			Definition d = definitions[rule.position-1];
			d.setdText(d.getdText().substring(0, d.getdText().length()-1));
			
//			rule.position
//			for (int i = 0; i < definitions.length; i++) {
//				text+= definitions[i].getdText();
//				if(i != rule.getPosition()-1)
//					text+= " ";
//			}
//			definitions = text.replaceAll("^(\\S*)((\\s*\\S*){"+ (rule.position-1)+ "})\\s(\\S)", "$1$2$4");
			break;
			
		case 2:
			String tCur = definitions[rule.position-1].getdText();
			String tLast = tCur.substring(tCur.length()-3, tCur.length()-1);
			if(tLast.equals("ލު"))
				tCur = tCur.substring(0, tCur.length()-3)+ "ލަށް ";
			
			definitions[rule.position-1].setdText(tCur);
			break;

		default:
			break;
		}
		
		for (int i = 0; i < definitions.length; i++)
			text+= definitions[i].getdText();
		
		return text;
	}
	
	@SuppressWarnings("resource")
	public static void importDictionary(){
		   Connection conn = null;
		   Statement stmt = null;
		   try{
		      //STEP 2: Register JDBC driver
		      Class.forName("com.mysql.jdbc.Driver");
 
		      //STEP 3: Open a connection
		      System.out.println("Connecting to database...");
		      conn = DriverManager.getConnection(DB_URL,USER,PASS);

		      //STEP 4: Execute a query
		      System.out.println("Creating statement...");
		      stmt = conn.createStatement();
		      String sql;
		      sql = "SELECT * FROM definition";
		      ResultSet rs = stmt.executeQuery(sql);

		      //STEP 5: Extract data from result set
		      while(rs.next()){
		         //Retrieve by column name
					String eText = rs.getString("d_eName");
					String dText = rs.getString("d_dName");
					Integer type = rs.getInt("d_type");
					definitions.put(eText+ type, new Definition(eText, dText, type));
					wordToWord.put(eText, new Definition(eText, dText, type));

		         //Display values
		         System.out.print("eText: " + eText + " dText: " + dText  + " type: "
		        		 + type );
		      }
		      //STEP 6: Clean-up environment
		      rs.close();
		      stmt.close();
		      conn.close();
		   }catch(SQLException se){
		      //Handle errors for JDBC
		      se.printStackTrace();
		   }catch(Exception e){
		      //Handle errors for Class.forName
		      e.printStackTrace();
		   }finally{
		      //finally block used to close resources
		      try{
		         if(stmt!=null)
		            stmt.close();
		      }catch(SQLException se2){
		      }// nothing we can do
		      try{
		         if(conn!=null)
		            conn.close();
		      }catch(SQLException se){
		         se.printStackTrace();
		      }//end finally try
		   }//end try
		   System.out.println("Goodbye!");

		
		
		dataImported = true;
		try {
			rules = new Hashtable<Integer, Rule>();
			definitions = new Hashtable<String, Definition>();
			wordToWord = new Hashtable<String, Definition>();
			
			java.util.Scanner sc = new java.util.Scanner(DictionaryStr).useDelimiter("(\\s|\\n)");
//			java.util.Scanner sc = new java.util.Scanner(DictionaryStr).useDelimiter("(\\r)?(\\n)?\\s(\\r)?(\\n)?");
			
			while(sc.hasNext()){
				String eText = sc.next();
				String dText = sc.next();
				@SuppressWarnings("unused")
				String test = sc.next();
				Integer type = Integer.parseInt(sc.next());
				definitions.put(eText+ type, new Definition(eText, dText, type));
				wordToWord.put(eText, new Definition(eText, dText, type));
			} 
			
			sc = new java.util.Scanner(RulesStr).useDelimiter("(\\r\\n|\\r|\\n)");
			
			LinkedList<Integer> r = new LinkedList<Integer>();
			for(int i=0; sc.hasNext(); i++){
				java.util.Scanner lSc = new java.util.Scanner(sc.next());
				r = new LinkedList<Integer>();
				
				if(!lSc.hasNextInt())
					continue;
				 
				while(lSc.hasNextInt())
					r.add(lSc.nextInt());
				Integer[] rArr = r.toArray(new Integer[0]);
				rules.put(i, new Rule(rArr));
				lSc.close();
			}
			
			sc.close();
		}finally{
			
		}
/*		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	
	}	
}
