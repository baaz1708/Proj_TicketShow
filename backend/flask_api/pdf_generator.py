from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.image('static/images/ticketshow.jpg', 10, 8, 25)
        self.set_font('helvetica', 'B', 20)
        self.cell(80)
        self.set_draw_color(0,247,105)
        self.set_fill_color(23,247,105)
        self.set_text_color(0,20,40)
        self.set_line_width(1)
        self.cell(50, 10, 'Ticket Show', border=1, ln=1, align='C', fill=1)
        self.ln(20)

    def figure_title(self, num, label):
        # Chapter Title
        self.set_font('helvetica', 'B', 15)
        self.set_fill_color(255, 255, 255)
        self.set_text_color(0,0,0)
        self.set_draw_color(0,0,0)
        self.set_line_width(0.2)

        self.cell(0, 10, f'fig-{num}:{label}', 0, 1, 'C', 1)
        self.set_font('helvetica', '', 12)
        self.ln(2)

    def print_figure(self,fig_num,fig_title,img):
        self.figure_title(fig_num, fig_title)
        self.image(img, -4, 50, 225)
    
    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica','I',10)
        self.cell(0,10,f'Page{self.page_no()}/{{nb}}', align='C')

def generate_pdf(userid,venueNames):
    #create FPDF object
    #Layout ('P','L')
    # Unit ('mm','cm','in')
    # format ('A3', 'A4 (default)', 'A5', 'A6', 'Letter', 'Legal', 'Tabloid', (100,150))
    pdf = PDF('P', 'mm', 'Letter')

    # Add a page
    pdf.add_page()
    website = 'http://localhost:8080/'
    # specify fonts
    # fonts('times','courier','helvetica','symbol','zapfdingbats')
    # 'B'(bold), 'U'(underline), 'I'(italic), 'Strike'(strike), ''(regular), combination (i.e, ('BU'))

    pdf.image('static/images/imgshow.jpg',-4, 0, 225)
    pdf.set_y(225)
    pdf.ln(5)
    pdf.set_text_color(0,242,87)
    pdf.cell(0,10,'Go to the website',ln=1, align='C', link=website)
    pdf.set_text_color(0,0,0)
   
    pdf.add_page()
    width,height=pdf.w,pdf.h
    pdf.image('static/images/helpbox.jpg',x = 0, y = 0, w = width, h = height)
    pdf.image(f'static/images/timed_booking_{userid}.png',20,18,180,170)
   
    pdf.add_page()
    pdf.image('static/images/offwhiteline.jpg', x = 0, y = 0, w = width, h = height)
    for i in range(0,len(venueNames)-1,2):
        leftVenuepic = venueNames[i]
        rightVenuepic=venueNames[i+1]
        pdf.image(f'static/images/top_shows_{leftVenuepic}.png',x=20,y=20,w=160,h=90)
        pdf.image(f'static/images/top_shows_{rightVenuepic}.png',x=20,y=130,w=160,h=90)

        pdf.add_page()
        pdf.image('static/images/traspages.jpg', x = 0, y = 0, w = width, h = height)
    
    try:
        pdf.output(f'static/pdfs/user_report_{userid}.pdf')
    except Exception as e:
        print(f"Error generating PDF: {e}")


